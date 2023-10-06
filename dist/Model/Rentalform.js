"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rent = new mongoose_1.default.Schema({
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
}, {
    timestamps: true
});
const formprofile = mongoose_1.default.model("rentalschema", rent);
exports.default = formprofile;
