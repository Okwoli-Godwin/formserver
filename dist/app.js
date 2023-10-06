"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./Routes/routes"));
const appConfig = (app) => {
    app.set("view engine", "ejs");
    app.use(express_1.default.json())
        .use((0, cors_1.default)())
        .use((0, morgan_1.default)("dev"));
    app.use("/app/router", routes_1.default);
};
exports.appConfig = appConfig;
