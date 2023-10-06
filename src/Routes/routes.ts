import express from "express"
import { Message, VerifiedStaffFinally } from "../Controller/Controller"


const router = express.Router()

router.post("/postmessage", Message)
router.post("/:userId/accept", VerifiedStaffFinally)

export default router