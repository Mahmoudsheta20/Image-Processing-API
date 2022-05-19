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
exports.imageconvert = exports.cache = void 0;
const sharp_1 = __importDefault(require("sharp"));
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 100 });
exports.cache = cache;
const imageconvert = (img, width, height, newImage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cache.get("imageName") === newImage &&
            cache.get("width") === width &&
            cache.get("height") === height) {
            console.log("cache");
            return newImage;
        }
        else {
            console.log("no cahe");
            yield (0, sharp_1.default)(img)
                .resize({ width: width, height: height })
                .toFile(newImage);
            cache.set("imageName", newImage);
            cache.set("width", width);
            cache.set("height", width);
            console.log("cache");
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.imageconvert = imageconvert;
