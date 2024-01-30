import User from "../user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export async function signUp(req, res, next) {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hashSync(password, 10);
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
