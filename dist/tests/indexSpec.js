"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const request = (0, supertest_1.default)(index_1.default);
describe("test start endpoint:", () => {
    it("get/", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/");
        expect(response.status).toBe(200);
    }));
});
describe("test api image endpoint:", () => {
    it("api/image", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/api/image?name=encenadaport&width=600&height=500");
        expect(response.status).toBe(200);
    }));
});
describe("Test not found endpoint:", () => {
    it("/anything", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/anything");
        expect(response.status).toBe(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const resize = path_1.default.resolve(__dirname, "../../image/new/encenadaport-new.jpg");
    try {
        yield fs_1.promises.access(resize);
        fs_1.promises.unlink(resize);
        console.log("passed the test");
    }
    catch (err) {
        console.log(`There is a mistake in${err}`);
    }
}));
