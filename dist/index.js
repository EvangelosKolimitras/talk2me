"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utils_1 = __importDefault(require("./utils"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
// Sets static folder
app.use(express_1.default.static(utils_1.default("public")));
app
    .get("/", function (_req, res) {
    res.sendFile("index");
})
    .listen(PORT, function () { return console.log("Listening on port " + PORT); });
