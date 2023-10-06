import mongoose from "mongoose"
import { enviromentvariables } from "../Enviromentvariables/enviromentvariables"

const URL = enviromentvariables.MONGOCONNECT;
const local = "mongodb://0.0.0.0:27017/chibuform";

export const dbconnection = async () => {
    try {
        const conn = await mongoose.connect(URL);
    if (mongoose.connection.host === "localhost") {
      console.log("connected to localhost");
    } else {
      console.log("Database is live now");
    }
    } catch (error) {
        console.log("failed to connect to the database", error);
    }
}