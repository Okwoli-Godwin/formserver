import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path"
import ejs from "ejs"

const staffURL = "https://formwork-snowy.vercel.app"


const GOOGLE_ID =
  "1058807818403-9k1qopfn64mdm7k3abn4vjl39ro9h02u.apps.googleusercontent.com";
const GOOGLE_SECRET = "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"

const GOOGLE_REDIRECT = "https://developers.google.com/oauthplayground";
const REFRESH =
  "1//04Bu4WweiekqbCgYIARAAGAQSNwF-L9Iro-IPeRO2p8BYz5yf4mOTqhgNUIkp_0afZ3sO-tLJDiyMjQnhCWrKGIiIpmxuIm4BwIA";

const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, REFRESH);
oAuth.setCredentials({ refresh_token: REFRESH });

export const colaboratoremailEnv = async (sender: any) => {
  try {
    oAuth.setCredentials({ access_token: REFRESH });
    const getToken: any = (await oAuth.getAccessToken()).token;

    const receiverEmail = "nwadikechibuikem23@gmail.com"

    const transporter = nodemailer.createTransport({
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
      console.log(sender.email)
      
    const mailerOption = {
      from: `${sender?.email}<${receiverEmail}>`,
      to: receiverEmail,
      subject: "Need a Research Collaborator",
      html: `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
     <title>Need a Research Collaborator</title>
      </head>
      <body>
  
        <h3>From ${sender?.name}</h3>
        <br>
		  <h4>Department : ${sender?.department}</h4>
        <h4>Level : ${sender?.level}</h4>
        <h4>phoneNumber : ${sender?.phoneNumber}</h4>
        <h4>ResearchTopic : ${sender?.ResearchTopic}</h5>
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
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = async (user: any) => {
  try {
    oAuth.setCredentials({ access_token: REFRESH });
    const getToken: any = (await oAuth.getAccessToken()).token;

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "OAuth2",
        user: "techicon19@gmail.com",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: REFRESH,
        // accessToken: getToken,
        accessToken:
          "ya29.a0Ael9sCOp1mUjffmmY5D70w-X3R2iCNqJNWkxudg3uYVTWpw4Ez2XpcPLUrdZhu3WSr7CnLHSiKzfQoU0WbnNjenICeyQKZCtJwhNDqUjy53Fowq6gbyB5vKhCRi8O3rf5uuAxeEzPuqEy4jVN2M74uTkHDgzwmQaCgYKAZQSARMSFQF4udJhxwbKl7hn-sLmpfCC5t9_rw0166",
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
  } catch (error) {
    console.log(error);
  }
};

export const verifyStaffEmailByAdmin = async (user: any) => {
  try {
    const accessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "aclassconsultsenquiry@gmail.com",
        type: "OAuth2",
        clientId: GOOGLE_ID,
        clientSecret: GOOGLE_SECRET,
        refreshToken: REFRESH,
        accessToken: accessToken.token,
      },
    });


    const getData = path.join(__dirname, "../views/AdminUserSignup.ejs");

    const readData = await ejs.renderFile(getData, {

        firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            number: user?.number,
            location: user?.location,
            inquiry: user?.inquiry,
            message: user?.message,
            id: user?._id
    });

    let mailerOptions = {
      from: "aclassconsultsenquiry@gmail.com",
      to: `aclassconsultsenquiry@gmail.com`,
      subject: "Contact Form",
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
  } catch (error) {
    throw error;
  }
};

export const verifyStaffEmail = async (user: any) => {
  try {
    const accessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
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

    const getData = path.join(__dirname, "../views/UserSignUp.ejs");

    const readData = await ejs.renderFile(getData, {
      name: user?.yourName,
      email: user?.email,
      token: user?.token,
      id: user?._id,
      url: `${staffURL}/${user?._id}/verifystaff`,
    });

    let mailerOptions = {
      from: "easyhrplayform@gmail.com",
      to: user?.email,
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
  } catch (error) {
    throw error;
  }
};

export const finalVerifyStaffEmail = async (user: any) => {
  try {
    const accessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
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

    const getData = path.join(__dirname, "../views/FinalStaffVerification.ejs");

    const readData = await ejs.renderFile(getData, {
      name: user?.yourName,
      companyname: user?.companyname,
      email: user?.email,
    //   OTP: user?.OTP,
      id: user?._id,
  
    //   url: `${staffURL}/${user?._id}/checkotp`,
    });
    console.log(readData)

    let mailerOptions = {
      from: "nwadikechibuikem23@gmail.com",
      to: user?.email,
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
  } catch (error) {
    throw error;
  }
};

export const finalVerifyAdminEmail = async (user: any, ) => {
  try {
    const accessToken: any = await oAuth.getAccessToken();

    const transporter = nodemailer.createTransport({
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

    const getData = path.join(
      __dirname,
      "../views/FinalAdminStaffVerification.ejs",
    );

    const readData = await ejs.renderFile(getData, {
 
     
      // email: staff?.email,
      // OTP: staff?.OTP,
      id: user?._id,
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
  } catch (error) {
    throw error;
  }
};