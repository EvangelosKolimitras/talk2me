import express, { Request, Response } from 'express'
import http from 'http';
import getStaticPath from './utils';
import * as socketio from 'socket.io'
const app = express();

let PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = new socketio.Server(server)

// Sets static folder
app.use(express.static(getStaticPath("public")))

io.on("connection", socket => {
	console.log("New connection", socket);

})

app.get("/", (_req: Request, res: Response) => {
	res.sendFile("index")
})

server.listen(PORT,
	() => console.log(`Listening on port ${PORT}`)
)