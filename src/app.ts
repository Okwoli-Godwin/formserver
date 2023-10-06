import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import router from "./Routes/routes"

export const appConfig = (app: Application) => {
      app.set("view engine", "ejs");
    app.use(express.json())
        .use(cors())
        .use(morgan("dev"))

    app.use("/app/router", router)
}