import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

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

// Allow json to server
app.use(express.json());

app.use(urlencoded({ extended: true }));

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
