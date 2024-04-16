import mongoose from "mongoose";

interface rentalschema{
    firstName: string;
    LastName: string;
    email: string;
    number: number;
    location: string;
    inquiry: string;
    message: string
}

interface formschema extends rentalschema, mongoose.Document{ }

const rent = new mongoose.Schema (
    {
        firstName: {
            type: String, 
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        number: {
            type: Number,
        },
        location: {
            type: String,
        },
        inquiry: {
            type: String,
           required: true 
        },
        message: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const formprofile = mongoose.model<formschema>("rentalschema", rent)

export default formprofile