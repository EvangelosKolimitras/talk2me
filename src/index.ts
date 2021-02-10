import express, { Application, Request, Response } from 'express'
import getStaticPath, { formatMessage } from './utils';
import { Socket, Server } from 'socket.io';
import http from 'http';

const app: Application = express();
const server = http.createServer(app);

let PORT = process.env.PORT || 3000

// Sets static folder
app.use(express.static(getStaticPath("public")))

const io = new Server(server)

io.on("connection", (socket: Socket) => {

	const bot = "Bot"
	socket.emit("message", formatMessage(bot, "Welcome to Talk2Me"));

	// Broadcast connections
	socket.broadcast.emit("message", formatMessage(bot, "A new user has joined the chat."));

	// Broadcast disconections
	socket.on("disconnect", () => {
		io.emit("message", formatMessage(bot, "A user has left the chat"))
	})

	// Listen for chat messages
	socket.on("message-send-from-client", (msg) => {
		console.log(msg);
		io.emit("message", formatMessage("user", msg))
	})

})

app.get("/", (req: Request, res: Response) => {
	res.sendFile("index")
})

server.listen(PORT,
	() => console.log(`Listening on port ${PORT}`)
)