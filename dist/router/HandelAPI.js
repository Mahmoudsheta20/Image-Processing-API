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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageResize_1 = require("./imageResize");
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const name = String(req.query.name);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const img = path_1.default.resolve(__dirname, `../../image/old/${name}.jpg`);
    const newImage = path_1.default.resolve(__dirname, `../../image/new/${name}_new.jpg`);
    //   The  folder ./new already exists
    try {
        yield fs_1.promises.access(img);
        if (width <= 0 || height <= 0) {
            res.send('<h2>There is an error in width and height<h2>');
        }
        else {
            if (isNaN(width) && isNaN(height)) {
                res.sendFile(img);
            }
            else {
                yield (0, imageResize_1.imageconvert)(img, width, height, newImage);
                yield fs_1.promises.access(newImage);
                res.sendFile(newImage);
            }
        }
    }
    catch (_a) {
        res.send('<h2>There is an error in the file name</h2>');
    }
    next();
});
exports.default = test;
