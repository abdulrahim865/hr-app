import express from "express";
import { User } from "../schemas/UsersSchema";
import { generateToken } from "../util/generateToken";

const router = express.Router();

router.get("/", async (req: any, res) => {
  const { user } = req;
  if (user.role == "staff")
    return res.send(await User.find({ userId: user.userId }));
  return res.send(await User.find());
});
router.post("/", async (req, res) => {
  const { body } = req;

  // const isAnEmailAlreadyRegistered = await User.findOne({ email: email }).lean();

  try {
    const user = new User(body);
    await user.save();

    return res.send({
      token: generateToken({
        email: user.email,
        password: user.password,
      }),
    });
  } catch (err) {
    return res.send({ err });
  }

  // const user = new User(body);
  // await user.save();
  // res.send(user);
});

router.post("/getData", async (req: any, res) => {
  const { user: userData } = req;
  try {
    return res.send(userData);
  } catch (err) {
    return res.send({ err });
  }
});

export default router;
