import express, { urlencoded } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import listingRoute from "./routes/listings.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

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

const __dirname = path.resolve();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Allow json to server
app.use(express.json());

app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listings", listingRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

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
