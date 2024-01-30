import User from "../user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export async function signUp(req, res, next) {
  const { username, email, password, cpassword } = req.body;
  if (password !== cpassword) {
    return next(
      errorHandler(400, "Password and Confirm password do not match")
    );
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (error) {
    next(error);
  }
}
