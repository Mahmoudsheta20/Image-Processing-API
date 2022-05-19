import path from "path";
import { promises as fs } from "fs";
import exprees, { Request, Response } from "express";
import { imageconvert } from "./imageResize";
import NodeCache from "node-cache";
import { cache } from "./imageResize";
const test = async (
  req: exprees.Request,
  res: exprees.Response,
  next: Function
): Promise<void> => {
  const name = String(req.query.name);
  const width = Number(req.query.width);
  const height = Number(req.query.height);

  const img = path.resolve(__dirname, `../../image/old/${name}.jpg`);

  const newImage = path.resolve(__dirname, `../../image/new/${name}_new.jpg`);
  //   The  folder ./new already exists

  try {
    await fs.access(img);
    if (width <= 0 || height <= 0) {
      res.send("<h2>There is an error in width and height<h2>");
    } else {
      if (isNaN(width) && isNaN(height)) {
        res.sendFile(img);
      } else {
        if (
          cache.get("imageName") === newImage &&
          cache.get("width") === width &&
          cache.get("height") === height
        ) {
          const x: unknown = cache.get("imageName");
          res.sendFile(x as string);
        } else {
          await imageconvert(img, width, height, newImage);

          await fs.access(newImage);
          res.sendFile(newImage);
        }
      }
    }
  } catch {
    res.send("<h2>There is an error in the file name</h2>");
  }
  next();
};
export default test;
