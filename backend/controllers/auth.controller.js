import User from "../user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export async function login(req, res, next) {
  const { email, password } = req.body;
  const validUser = await User.findOne({ email });
  const userResponse = await User.findOne({ email }).select("-password");

  if (!validUser) {
    return next(
      errorHandler(404, "User not found! Please enter a valid email")
    );
  }
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) {
    return next(errorHandler(404, "Invalid password"));
  }

  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .status(200)
    .json(userResponse);
}
