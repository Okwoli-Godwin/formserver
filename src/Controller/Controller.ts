import formprofile from "../Model/Rentalform";
import { Request, Response } from "express"
import { finalVerifyAdminEmail, finalVerifyStaffEmail, verifyStaffEmail, verifyStaffEmailByAdmin } from "../Utils.ts/Email";

export const Message = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
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
        } = req.body;

        const createData = await formprofile.create({
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
        })

    
        verifyStaffEmailByAdmin(createData);

        return res.status(200).json({
            message: "check your email for verification",
            data: {createData}
        })
    } catch (error) {
        return res.status(400).json({
            message: "failed to send email",
            data: error
        })
    }
}

export const VerifiedStaffFinally = async (req: Request, res: Response) => {
  try {
    const { response } = req.body;

    const getUser = await formprofile.findById(req.params.userId);
 

    if (response === "Yes") {
      if (getUser) {
       

        finalVerifyAdminEmail(getUser);

        finalVerifyStaffEmail(getUser);

        res.status(201).json({ message: "Sent..."  });
        res.end();
      } else {
        return res.status(404).json({
          message: "user doesn't exist",
        });
      }
    } else if (response === "No") {
      if (getUser) {
     
        await formprofile.findByIdAndDelete(req.params.userId);
        return res.status(201).json({ message: "user has been deleted" });
      }
    } else {
      return res.json({ message: "You can't be accepted" });
    }

    res.end();
  } catch (err:any) {
    return res.status(400).json({
      message: "error",
      data: err,
      errMsg : err?.message
    });
  }
};