import express, { Request, Response } from 'express'
const app = express();

let PORT = process.env.PORT || 3000

app
	.get("/", (req: Request, res: Response) => {
		res.send("Success!")
	})
	.listen(PORT,
		() => console.log(`Listening on port ${PORT}`)
	)