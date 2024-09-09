import express from "express";
import { Attendance } from "../schemas/AttendanceSchema";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const { user } = req;
  if (user.role == "staff")
    return res.send(await Attendance.find({ user }).populate("user"));
  return res.send(await Attendance.find().populate("user"));
});
router.post("/", async (req: any, res) => {
  const { body, user } = req;
  const attendance = new Attendance({ ...body, user });
  await attendance.save();
  return res.send(attendance);
});
export default router;
