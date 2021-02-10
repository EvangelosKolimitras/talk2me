"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMessage = void 0;
var path_1 = __importDefault(require("path"));
var moment_1 = __importDefault(require("moment"));
function getStaticPath(path) {
    return function (directory) {
        return path.resolve(__dirname, "../../", directory);
    };
}
function formatMessage(username, text) {
    return {
        username: username,
        text: text,
        timestamp: moment_1.default().format("h:mm a")
    };
}
exports.formatMessage = formatMessage;
exports.default = getStaticPath(path_1.default);
