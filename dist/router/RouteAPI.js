"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HandelAPI_1 = __importDefault(require("./HandelAPI"));
const router = express_1.default.Router();
router.get('/api/image', HandelAPI_1.default, (req, res) => { });
exports.default = router;
