// # IMPORTS -/
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import attendanceRoutes from "./routes/AttendanceRoutes";
import UserRoutes from "./routes/UserRoutes";
import LeaveRoutes from "./routes/LeaveRoutes";
import { authenticateMiddleware } from "./middlewares/auth";
import { User } from "./schemas/UsersSchema";
import bcrypt from "bcrypt";
import { generateToken } from "./util/generateToken";

// # EXPRESS::INITIALIZE APP -/

const app = express();
require("dotenv").config();

// # ADD MIDDLEWARE -/

app.use(bodyParser.json());

app.use(cors());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_DATABASE_HOST}/${process.env.MONGO_INITDB_DATABASE}`
  )
  .then(() => {
    app.listen(9999, () => {
      console.log("Connected to Port 9999.");
    });
    app.use("/attendance", authenticateMiddleware, attendanceRoutes);
    app.use("/leaves", authenticateMiddleware, LeaveRoutes);
    app.use("/users", authenticateMiddleware, UserRoutes);

    app.post("/auth", async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword)
        return res.status(200).send({
          token: await generateToken({
            uuid: user.uuid,
          }),
        });
      if (!isCorrectPassword && user.uuid)
        return res.status(400).send({ error: "Wrong password" });
      return res.status(400).send({ error: "Authentication Error" });
    });
  })
  .catch((err) => console.log(err));
