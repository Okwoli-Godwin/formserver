"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedStaffFinally = exports.Message = void 0;
const Rentalform_1 = __importDefault(require("../Model/Rentalform"));
const Email_1 = require("../Utils.ts/Email");
const Message = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, gender, email, phoneNumber, address, dateOfBirth, married, car, pet, occupation, document, staying, aggrement, movingIn, security, paying, ApplicationFee, nowPayment, question, signature } = req.body;
        const createData = yield Rentalform_1.default.create({
            name,
            gender,
            email,
            phoneNumber,
            address,
            dateOfBirth,
            married,
            car,
            pet,
            occupation,
            document,
            staying,
            aggrement,
            movingIn,
            security,
            paying,
            ApplicationFee,
            nowPayment,
            question,
            signature
        });
        (0, Email_1.verifyStaffEmailByAdmin)(createData);
        return res.status(200).json({
            message: "check your email for verification",
            data: { createData }
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to send email",
            data: error
        });
    }
});
exports.Message = Message;
const VerifiedStaffFinally = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { response } = req.body;
        const getUser = yield Rentalform_1.default.findById(req.params.userId);
        if (response === "Yes") {
            if (getUser) {
                yield Rentalform_1.default.findByIdAndUpdate(req.params.id, {
                    token: "",
                    verified: true,
                }, { new: true });
                (0, Email_1.finalVerifyAdminEmail)(getUser);
                (0, Email_1.finalVerifyStaffEmail)(getUser);
                res.status(201).json({ message: "Sent..." });
                res.end();
            }
            else {
                return res.status(404).json({
                    message: "user doesn't exist",
                });
            }
        }
        else if (response === "No") {
            if (getUser) {
                return res.status(201).json({ message: "staff has been deleted" });
            }
        }
        else {
            return res.json({ message: "You can't be accepted" });
        }
        res.end();
    }
    catch (err) {
        return res.status(400).json({
            message: "error",
            data: err,
            errMsg: err === null || err === void 0 ? void 0 : err.message
        });
    }
});
exports.VerifiedStaffFinally = VerifiedStaffFinally;
