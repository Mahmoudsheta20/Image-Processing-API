import sharp from "sharp";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 100 });
const stats = sharp.cache();

const imageconvert = async (
  img: string,
  width: number,
  height: number,
  newImage: string
): Promise<void> => {
  try {
    await sharp(img).resize({ width: width, height: height }).toFile(newImage);

    cache.set("imageName", newImage);
    cache.set("width", width);
    cache.set("height", height);
  } catch (err) {
    console.log(err);
  }
};

export { cache, imageconvert };
