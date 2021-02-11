import express, { Application, Request, Response } from 'express'
import getStaticPath, { formatMessage } from './utils';
import { Socket, Server } from 'socket.io';
import http from 'http';

const app: Application = express();
const server = http.createServer(app);

interface IUser { id: string, username: string | any, room: number | string | any }
const users: IUser[] = [];

let PORT = process.env.PORT || 9999

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

		// 
		io.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getUsersInARoom(user.room)
		})

	})

	// Listen for chat messages
	socket.on("message-send-from-client", (msg) => {
		const user = getCurrentUser(socket.id);
		user && io.to(user.room).emit("message", formatMessage(user.username, msg))
	})

	// Broadcast disconections
	socket.on("disconnect", () => {
		const user = onUserLeavesRoom(socket.id);

		if (user) {
			io.to(user.room).emit("message", formatMessage(bot, `${user!.username} has left the room`))

			io.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getUsersInARoom(user.room)
			})
		}
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
	return users.find(user => user.id === id);
}

function onUserLeavesRoom(id: string) {
	const index = users.findIndex(user => user.id === id)
	if (index !== -1)
		return users.splice(index, 1)[0];

}

function getUsersInARoom(room: any) {
	return users.filter(user => user.room === room)
}