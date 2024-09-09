import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
    required: false,
  },
  checkIn: {
    type: Date,
    required: true,
    default: Date.now,
  },
  checkOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export const Attendance = mongoose.model("attendance", AttendanceSchema);
