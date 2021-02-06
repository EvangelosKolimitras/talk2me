import express, { Request, Response } from 'express'
import getStaticPath from './utils';

const app = express();

let PORT = process.env.PORT || 3000

// Sets static folder
app.use(express.static(getStaticPath("public")))

app
	.get("/", (_req: Request, res: Response) => {
		res.sendFile("index")
	})
	.listen(PORT,
		() => console.log(`Listening on port ${PORT}`)
	)