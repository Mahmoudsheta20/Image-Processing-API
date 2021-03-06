import app from "../index";
import supertest from "supertest";
import path from "path";
import { promises as fs } from "fs";
import { imageconvert } from "../router/imageResize";

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe("test start endpoint:", (): void => {
  it("get/", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/");
    expect(response.status).toBe(200);
  });
});

describe("test api image endpoint:", (): void => {
  it("api/image", async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      "/api/image?name=encenadaport&width=600&height=500"
    );
    expect(response.status).toBe(200);
  });
});

describe("Test not found endpoint:", (): void => {
  it("/anything", async (): Promise<void> => {
    const response: supertest.Response = await request.get("/anything");
    expect(response.status).toBe(404);
  });
});

describe("test imageconvert", (): void => {
  it("image function", async (): Promise<void> => {
    const resize: string = path.resolve(
      __dirname,
      "../../image/new/encenadaport_new.jpg"
    );
    const img = path.resolve(__dirname, `../../image/old/encenadaport.jpg`);

    expect(async (): Promise<void> => {
      await imageconvert(img, 50, 50, resize);
    }).not.toThrow();
  });
});

afterAll(async (): Promise<void> => {
  const resize: string = path.resolve(
    __dirname,
    "../../image/new/encenadaport_new.jpg"
  );

  try {
    await fs.access(resize);
    fs.unlink(resize);
    console.log("passed the test");
  } catch (err) {
    console.log(`There is a mistake in${err}`);
  }
});
