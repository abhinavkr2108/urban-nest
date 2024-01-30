import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.error(err);
    console.log(process.env.MONGO_URL);
  });

const app = express();
app.use(cors({ origin: "*" }, { credentials: true }));

// Allow json to server
app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    message: message,
    status: status,
  });
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
