import express from "express";
import { Leaves } from "../schemas/LeaveSchema";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const { user } = req;
  if (user.role == "staff")
    return res.send(await Leaves.find({ user }).populate("user"));
  return res.send(await Leaves.find().populate("user"));
});
router.post("/", async (req: any, res) => {
  const { body, user } = req;
  const leave = new Leaves({ ...body, user });
  await leave.save();
  return res.send(leave);
});
router.patch("/", async (req: any, res) => {
  const { isApproved, leaveId } = req.body;
  const leave = await Leaves.findOneAndUpdate(
    { leaveId },
    { $set: { isApproved } },
    { new: true, upsert: false, remove: {}, fields: {} }
  );
  return res.send(leave);
});
export default router;
