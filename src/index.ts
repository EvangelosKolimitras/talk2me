import express, { Application, Request, Response } from 'express'
import getStaticPath, { formatMessage } from './utils';
import { Socket, Server } from 'socket.io';
import http from 'http';

const app: Application = express();
const server = http.createServer(app);

const users: any[] = [];

let PORT = process.env.PORT || 3000

// Sets static folder
app.use(express.static(getStaticPath("public")))

const io = new Server(server)

io.on("connection", (socket: Socket) => {

	const bot = "Bot";

	socket.on("joinroom", ({ username, room }) => {

		const user = userJoined(socket.id, username, room);

		socket.join(user.room);

		socket.emit("message", formatMessage(bot, "Welcome to Talk2Me"));

		// Broadcast connections	
		socket.broadcast.to(user.room).emit("message", formatMessage(bot, `${user.username} has joined the chat.`));

	})

	// Listen for chat messages
	socket.on("message-send-from-client", (msg) => {
		const user = getCurrentUser(socket.id);
		console.log(user);
		io.to(user.room).emit("message", formatMessage(user.username, msg))
	})

	// Broadcast disconections
	socket.on("disconnect", () => {
		io.emit("message", formatMessage(bot, "A user has left the chat"))
	})

})


server.listen(PORT,
	() => console.log(`Listening on port ${PORT}`)
)

// Join user to room
function userJoined(id: string, username: string, room: string) {
	const user = { id, username, room }
	users.push(user)
	return user
}

function getCurrentUser(id: string) {
	return users.find((user: { id: string }) => user.id === id);
}