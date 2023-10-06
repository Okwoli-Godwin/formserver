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
exports.dbconnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enviromentvariables_1 = require("../Enviromentvariables/enviromentvariables");
const URL = enviromentvariables_1.enviromentvariables.MONGOCONNECT;
const local = "mongodb://0.0.0.0:27017/chibuform";
const dbconnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(URL);
        if (mongoose_1.default.connection.host === "localhost") {
            console.log("connected to localhost");
        }
        else {
            console.log("Database is live now");
        }
    }
    catch (error) {
        console.log("failed to connect to the database", error);
    }
});
exports.dbconnection = dbconnection;
