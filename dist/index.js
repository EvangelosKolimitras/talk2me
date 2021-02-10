"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utils_1 = __importDefault(require("./utils"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var PORT = process.env.PORT || 3000;
// Sets static folder
app.use(express_1.default.static(utils_1.default("public")));
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    // Broadcast connections
    socket.broadcast.emit("message", "A new user has joined the chat.");
    // Broadcast disconections
    socket.on("disconnect", function () {
        io.emit("message", "A user has left the chat");
    });
    // Listen for chat messages
    socket.on("message-send-from-client", function (msg) {
        console.log(msg);
        io.emit("message", msg);
    });
});
app.get("/", function (req, res) {
    res.sendFile("index");
});
server.listen(PORT, function () { return console.log("Listening on port " + PORT); });
