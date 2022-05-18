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
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const node_cache_1 = __importDefault(require("node-cache"));
const fs_1 = require("fs");
const router = express_1.default.Router();
const cache = new node_cache_1.default({ stdTTL: 100 });
router.get("/api/image", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const image = {
        name: String(req.query.name),
        width: Number(req.query.width),
        height: Number(req.query.height),
    };
    const convert = () => __awaiter(void 0, void 0, void 0, function* () {
        const img = path_1.default.resolve(__dirname, `../../image/old/${image.name}.jpg`);
        const newImage = path_1.default.resolve(__dirname, `../../image/new/${image.name}-new.jpg`);
        try {
            yield fs_1.promises.access(img);
            if (isNaN(image.height) ||
                (image.height === 0 && isNaN(image.width)) ||
                image.width === 0) {
                res.sendFile(img);
            }
            else {
                if (cache.get("image")) {
                    res.sendFile(newImage);
                }
                else {
                    try {
                        yield (0, sharp_1.default)(img)
                            .resize({ width: image.width, height: image.height })
                            .toFile(newImage);
                        cache.set("image", newImage);
                        res.sendFile(newImage);
                    }
                    catch (err) {
                        res.send(`<h2>thers wrong  ${err}</h2>`);
                    }
                }
            }
        }
        catch (err) {
            res.send(`<h2>thers wrong<br></h2><p>${err}</p>`);
        }
    });
    convert();
}));
exports.default = router;
