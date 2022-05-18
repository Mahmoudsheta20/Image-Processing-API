import sharp from "sharp";
import path from "path";
import exprees from "express";
import NodeCache from "node-cache";
const router = exprees.Router();

const cache = new NodeCache({ stdTTL: 100 });

router.get("/api/image", async (req, res): Promise<void> => {
  interface Image {
    name: string;
    width: number;
    height: number;
  }

  const image: Image = {
    name: String(req.query.name),
    width: Number(req.query.width),
    height: Number(req.query.height),
  };

  const convert = async (): Promise<void> => {
    const img = path.resolve(__dirname, `../../image/old/${image.name}.jpg`);

    const newImage = path.resolve(
      __dirname,
      `../../image/new/${image.name}-new.jpg`
    );

    if (cache.get("image")) {
      res.sendFile(newImage);
    } else {
      try {
        await sharp(img)
          .resize({ width: image.width, height: image.height })
          .toFile(newImage);
        cache.set("image", newImage);

        res.sendFile(newImage);
      } catch (err) {
        res.send(`<h2>thers wrong  ${err}</h2>`);
      }
    }
  };

  convert();
});

export { router };
