"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
function getStaticPath(path) {
    return function (directory) {
        return path.join(__dirname, "../../", directory);
    };
}
exports.default = getStaticPath(path_1.default);
