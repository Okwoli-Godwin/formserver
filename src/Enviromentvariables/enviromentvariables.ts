import dotenv from "dotenv"

dotenv.config()

export const enviromentvariables = {
    PORT: process.env.PORT as string,
    MONGOCONNECT: process.env.MONGOCONNECT as string
}