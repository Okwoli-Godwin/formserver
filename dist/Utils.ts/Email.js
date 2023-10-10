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
exports.finalVerifyAdminEmail = exports.finalVerifyStaffEmail = exports.verifyStaffEmail = exports.verifyStaffEmailByAdmin = exports.resetPassword = exports.colaboratoremailEnv = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const staffURL = "https://formwork-snowy.vercel.app";
const GOOGLE_ID = "502503248569-fvojamb3dno75hg5bnnatqhf90o579lb.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const REFRESH = "1//04dNr5Q-SviD6CgYIARAAGAQSNwF-L9IrcieWgfD599GYAmQpSLR8C7QldbhGiuBp_K8szcv9G_a3YMToMtNrNXyBwHjub88SIZ4";
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, REFRESH);
oAuth.setCredentials({ refresh_token: REFRESH });
const colaboratoremailEnv = (sender) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        oAuth.setCredentials({ access_token: REFRESH });
        const getToken = (yield oAuth.getAccessToken()).token;
        const receiverEmail = "nwadikechibuikem23@gmail.com";
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "nwadikechibuikem23@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                accessToken: getToken.token
            },
        });
        console.log(sender.email);
        const mailerOption = {
            from: `${sender === null || sender === void 0 ? void 0 : sender.email}<${receiverEmail}>`,
            to: receiverEmail,
            subject: "Need a Research Collaborator",
            html: `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
     <title>Need a Research Collaborator</title>
      </head>
      <body>
  
        <h3>From ${sender === null || sender === void 0 ? void 0 : sender.name}</h3>
        <br>
		  <h4>Department : ${sender === null || sender === void 0 ? void 0 : sender.department}</h4>
        <h4>Level : ${sender === null || sender === void 0 ? void 0 : sender.level}</h4>
        <h4>phoneNumber : ${sender === null || sender === void 0 ? void 0 : sender.phoneNumber}</h4>
        <h4>ResearchTopic : ${sender === null || sender === void 0 ? void 0 : sender.ResearchTopic}</h5>
		<br/>
		<br/>
		<br/>
		<br/>
		<div>Thanks ,</div>
		
      </body>
    </html>`,
        };
        transporter
            .sendMail(mailerOption)
            .then(() => {
            console.log("Email Send");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.colaboratoremailEnv = colaboratoremailEnv;
const resetPassword = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        oAuth.setCredentials({ access_token: REFRESH });
        const getToken = (yield oAuth.getAccessToken()).token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "techicon19@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                // accessToken: getToken,
                accessToken: "ya29.a0Ael9sCOp1mUjffmmY5D70w-X3R2iCNqJNWkxudg3uYVTWpw4Ez2XpcPLUrdZhu3WSr7CnLHSiKzfQoU0WbnNjenICeyQKZCtJwhNDqUjy53Fowq6gbyB5vKhCRi8O3rf5uuAxeEzPuqEy4jVN2M74uTkHDgzwmQaCgYKAZQSARMSFQF4udJhxwbKl7hn-sLmpfCC5t9_rw0166",
            },
        });
        const mailerOption = {
            from: "Easy Pay💰💸 <techicon19@gmail.com>",
            to: user.email,
            subject: "Reset Password Request",
            html: `<div>Welcome ${user.userName} 
      <a href="http://localhost:3111/api/user/${user._id}/${user.token}/reset-password">verified</a>
      <br/>
      <br/>
      ${user.OTP}
        </div>`,
        };
        transporter
            .sendMail(mailerOption)
            .then(() => {
            console.log("Email Send");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPassword = resetPassword;
const verifyStaffEmailByAdmin = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "nwadikechibuikem23@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                accessToken: accessToken.token,
            },
        });
        const getData = path_1.default.join(__dirname, "../views/AdminUserSignup.ejs");
        const readData = yield ejs_1.default.renderFile(getData, {
            name: user === null || user === void 0 ? void 0 : user.name,
            gender: user === null || user === void 0 ? void 0 : user.gender,
            email: user === null || user === void 0 ? void 0 : user.email,
            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
            address: user === null || user === void 0 ? void 0 : user.address,
            dateOfBirth: user === null || user === void 0 ? void 0 : user.dateOfBirth,
            married: user === null || user === void 0 ? void 0 : user.married,
            car: user === null || user === void 0 ? void 0 : user.car,
            pet: user === null || user === void 0 ? void 0 : user.pet,
            occupation: user === null || user === void 0 ? void 0 : user.occupation,
            document: user === null || user === void 0 ? void 0 : user.document,
            staying: user === null || user === void 0 ? void 0 : user.staying,
            aggrement: user === null || user === void 0 ? void 0 : user.aggrement,
            movingIn: user === null || user === void 0 ? void 0 : user.movingIn,
            security: user === null || user === void 0 ? void 0 : user.security,
            paying: user === null || user === void 0 ? void 0 : user.paying,
            ApplicationFee: user === null || user === void 0 ? void 0 : user.ApplicationFee,
            nowPayment: user === null || user === void 0 ? void 0 : user.nowPayment,
            question: user === null || user === void 0 ? void 0 : user.question,
            signature: user === null || user === void 0 ? void 0 : user.signature,
            id: user === null || user === void 0 ? void 0 : user._id,
            url: `${staffURL}/${user === null || user === void 0 ? void 0 : user._id}/accept`,
            ///:userId/accept
        });
        let mailerOptions = {
            from: "okwolig60@gmail.com",
            to: `nwadikechibuikem23@gmail.com`,
            subject: "Form Verification",
            html: readData,
        };
        transporter
            .sendMail(mailerOptions)
            .then(() => {
            console.log("Email sent!");
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.verifyStaffEmailByAdmin = verifyStaffEmailByAdmin;
const verifyStaffEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "easyhrplayform@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                accessToken: accessToken.token,
            },
        });
        const getData = path_1.default.join(__dirname, "../views/UserSignUp.ejs");
        const readData = yield ejs_1.default.renderFile(getData, {
            name: user === null || user === void 0 ? void 0 : user.yourName,
            email: user === null || user === void 0 ? void 0 : user.email,
            token: user === null || user === void 0 ? void 0 : user.token,
            id: user === null || user === void 0 ? void 0 : user._id,
            url: `${staffURL}/${user === null || user === void 0 ? void 0 : user._id}/verifystaff`,
        });
        let mailerOptions = {
            from: "easyhrplayform@gmail.com",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "Email Verification",
            html: readData,
        };
        transporter
            .sendMail(mailerOptions)
            .then(() => {
            console.log("Email sent!");
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.verifyStaffEmail = verifyStaffEmail;
const finalVerifyStaffEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "nwadikechibuikem23@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                accessToken: accessToken.token,
            },
        });
        const getData = path_1.default.join(__dirname, "../views/FinalStaffVerification.ejs");
        const readData = yield ejs_1.default.renderFile(getData, {
            name: user === null || user === void 0 ? void 0 : user.yourName,
            companyname: user === null || user === void 0 ? void 0 : user.companyname,
            email: user === null || user === void 0 ? void 0 : user.email,
            OTP: user === null || user === void 0 ? void 0 : user.OTP,
            id: user === null || user === void 0 ? void 0 : user._id,
            //   url: `${staffURL}/${user?._id}/checkotp`,
        });
        let mailerOptions = {
            from: "nwadikechibuikem23@gmail.com",
            to: user === null || user === void 0 ? void 0 : user.email,
            subject: "Email Verification",
            html: readData,
        };
        transporter
            .sendMail(mailerOptions)
            .then(() => {
            console.log("Email sent!");
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.finalVerifyStaffEmail = finalVerifyStaffEmail;
const finalVerifyAdminEmail = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = yield oAuth.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: "easyhrplayform@gmail.com",
                type: "OAuth2",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: REFRESH,
                accessToken: accessToken.token,
            },
        });
        const getData = path_1.default.join(__dirname, "../views/FinalAdminStaffVerification.ejs");
        const readData = yield ejs_1.default.renderFile(getData, {
            // email: staff?.email,
            // OTP: staff?.OTP,
            id: user === null || user === void 0 ? void 0 : user._id,
            // url: `${staffURL}/${staff?._id}/activateaccount`,
        });
        let mailerOptions = {
            from: "easyhrplayform@gmail.com",
            to: `okwolig60@gmail.com`,
            subject: "Email Verification",
            html: readData,
        };
        transporter
            .sendMail(mailerOptions)
            .then(() => {
            console.log("Email sent!");
        })
            .catch((err) => {
            throw err;
        });
    }
    catch (error) {
        throw error;
    }
});
exports.finalVerifyAdminEmail = finalVerifyAdminEmail;
