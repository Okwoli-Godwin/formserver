import formprofile from "../Model/Rentalform";
import { Request, Response } from "express"
import { finalVerifyAdminEmail, finalVerifyStaffEmail, verifyStaffEmail, verifyStaffEmailByAdmin } from "../Utils.ts/Email";

export const Message = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            firstName,
            lastName,
            email,
            number,
            location,
            inquiry,
            message
        } = req.body;

        const createData = await formprofile.create({
            firstName,
            lastName,
            email,
            number,
            location,
            inquiry,
            message
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
        await formprofile.findByIdAndUpdate(
          req.params.id,
          {
            token: "",

            verified: true,
          },
          { new: true }
        );

        finalVerifyAdminEmail(getUser);

        finalVerifyStaffEmail(getUser);

        res.status(201).json({ message: "Sent..." });
        res.end();
      } else {
        return res.status(404).json({
          message: "user doesn't exist",
        });
      }
    } else if (response === "No") {
      if (getUser) {
        return res.status(201).json({ message: "staff has been deleted" });
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