import express, { Application, Request, Response } from "express"
import { dbconnection } from "./Config/db";
import { enviromentvariables } from "./Enviromentvariables/enviromentvariables";
import { appConfig } from "./app"

const app: Application = express()

appConfig(app)
dbconnection()

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
      message: "API READY FOR Chibu PROJECT",
    });
  });``

app.listen(enviromentvariables.PORT, () => {
      console.log("Server is up and running", enviromentvariables.PORT)
  })