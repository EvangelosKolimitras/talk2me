import express, { Request, Response } from 'express'
import getStaticPath from './utils';
const app = express();

let PORT = process.env.PORT || 3000

// const server = http.createServer(app)
// const io = new socketio.Server(server)

// Sets static folder
app.use(express.static(getStaticPath("public")))

// io.on("connection", socket => {
// 	console.log("New connection", socket);
// })

app.get("/", (_req: Request, res: Response) => {
	console.log(res);
	res.status(200).json({ msg: "111" })
})

app.listen(3000,
	() => console.log(`Listening on port ${PORT}`)
)