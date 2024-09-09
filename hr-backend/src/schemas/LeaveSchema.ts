import { randomUUID } from "crypto";
import { required } from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LeavesSchema = new Schema({
  leaveId: {
    type: String,
    required: true,
    unique: true,
    default: randomUUID,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
    required: false,
  },
  requestFrom: {
    type: Date,
    required: true,
  },
  requestTo: {
    type: Date,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false,
    required: false,
  },
});

export const Leaves = mongoose.model("leaves", LeavesSchema);
