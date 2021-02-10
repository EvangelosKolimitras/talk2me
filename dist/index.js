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
var users = [];
var PORT = process.env.PORT || 3000;
// Sets static folder
app.use(express_1.default.static(utils_1.default("public")));
var io = new socket_io_1.Server(server);
io.on("connection", function (socket) {
    var bot = "Bot";
    socket.on("joinroom", function (_a) {
        var username = _a.username, room = _a.room;
        var user = userJoined(socket.id, username, room);
        socket.join(user.room);
        socket.emit("message", utils_1.formatMessage(bot, "Welcome to Talk2Me"));
        // Broadcast connections	
        socket.broadcast.to(user.room).emit("message", utils_1.formatMessage(bot, user.username + " has joined the chat."));
    });
    // Listen for chat messages
    socket.on("message-send-from-client", function (msg) {
        console.log(msg);
        io.emit("message", utils_1.formatMessage("user", msg));
    });
    // Broadcast disconections
    socket.on("disconnect", function () {
        io.emit("message", utils_1.formatMessage(bot, "A user has left the chat"));
    });
});
server.listen(PORT, function () { return console.log("Listening on port " + PORT); });
// Join user to room
function userJoined(id, username, room) {
    var user = { id: id, username: username, room: room };
    users.push(user);
    return user;
}
function getCurrentUser(id) {
    return users.find(function (user) { return user.id === id; });
}
