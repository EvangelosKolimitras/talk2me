"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var utils_1 = __importStar(require("./utils"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var PORT = process.env.PORT || 3000;
// Sets static folder
app.use(express_1.default.static(utils_1.default("public")));
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    var bot = "Bot";
    socket.emit("message", utils_1.formatMessage(bot, "Welcome to Talk2Me"));
    // Broadcast connections
    socket.broadcast.emit("message", utils_1.formatMessage(bot, "A new user has joined the chat."));
    // Broadcast disconections
    socket.on("disconnect", function () {
        io.emit("message", utils_1.formatMessage(bot, "A user has left the chat"));
    });
    // Listen for chat messages
    socket.on("message-send-from-client", function (msg) {
        console.log(msg);
        io.emit("message", utils_1.formatMessage("user", msg));
    });
});
app.get("/", function (req, res) {
    res.sendFile("index");
});
server.listen(PORT, function () { return console.log("Listening on port " + PORT); });
