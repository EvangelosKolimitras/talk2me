"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utils_1 = __importDefault(require("./utils"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
// const server = http.createServer(app)
// const io = new socketio.Server(server)
// Sets static folder
app.use(express_1.default.static(utils_1.default("public")));
// io.on("connection", socket => {
// 	console.log("New connection", socket);
// })
app.get("/", function (_req, res) {
    console.log(res);
    res.status(200).json({ msg: "ok" });
});
app.listen(3000, function () { return console.log("Listening on port " + PORT); });
