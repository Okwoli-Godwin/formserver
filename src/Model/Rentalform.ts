import mongoose from "mongoose";

interface rentalschema{
    name: string;
    gender: string;
    email: string;
    phoneNumber: number;
    address: string;
    dateOfBirth: string;
    married: string;
    car: string;
    pet: string;
    occupation: string;
    document: string;
    staying: string;
    aggrement: string;
    movingIn: string;
    security: string;
    paying: string;
    ApplicationFee: string;
    nowPayment: string;
    question: string;
    signature: string;
}

interface formschema extends rentalschema, mongoose.Document{ }

const rent = new mongoose.Schema (
    {
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: String,
            required: true
        },
        married: {
            type: String,
            required: true
        },
        car: {
            type: String,
            required: true
        },
        pet: {
            type: String,
            required: true
        },
        occupation: {
            type: String,
            required: true
        },
        document: {
            type: String,
            required: true
        },
        staying: {
            type: String,
            required: true
        },
        aggrement: {
            type: String,
            required: true
        },
        movingIn: {
            type: String,
            required: true
        },
        security: {
            type: String,
            required: true
        },
        paying: {
            type: String,
            required: true
        },
        ApplicationFee: {
            type: String,
            required: true
        },
        nowPayment: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        signature: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const formprofile = mongoose.model<formschema>("rentalschema", rent)

export default formprofile