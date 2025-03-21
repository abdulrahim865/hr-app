import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;
  const options = {
    expiresIn: "12h", // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};
