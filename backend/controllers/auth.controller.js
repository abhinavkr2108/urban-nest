import User from "../user.model.js";
import bcryptjs from "bcryptjs";

export async function signUp(req, res) {
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
    res.status(500).json({ message: error.message });
  }
}
