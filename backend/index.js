import express, { urlencoded } from "express";
const app = express();

// const mongoose = require("mongoose");

app.use(express.json());

app.use(urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
