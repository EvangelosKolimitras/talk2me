import express, { Application, Request, Response } from 'express'
import getStaticPath from './utils';
import { Socket, Server } from 'socket.io';
import http from 'http';

const app: Application = express();
const server = http.createServer(app);

let PORT = process.env.PORT || 3000

// Sets static folder
app.use(express.static(getStaticPath("public")))

const io = new Server(server)

io.on("connection", (socket: Socket) => {

	// Broadcast connections
	socket.broadcast.emit("message", "A new user has joined the chat.");

	// Broadcast disconections
	socket.on("disconnect", () => {
		io.emit("message", "A user has left the chat")
	})

	// Listen for chat messages
	socket.on("message-send-from-client", (msg) => {
		console.log(msg);
		io.emit("message", msg)
	})

})

app.get("/", (req: Request, res: Response) => {
	res.sendFile("index")
})

server.listen(PORT,
	() => console.log(`Listening on port ${PORT}`)
)