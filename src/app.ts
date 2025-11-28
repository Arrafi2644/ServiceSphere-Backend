import express, { Request, Response } from "express"


const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "ServiceSphere application is running!!!"
    })
})

export default app;