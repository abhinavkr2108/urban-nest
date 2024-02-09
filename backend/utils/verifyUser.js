import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export async function verifyUserToken(req, res, next) {
  const token = req.body.token;
  console.log("REQUEST BODY");
  console.log(req.body);
  // console.log("COOKIKIES ", req.cookies);
  console.log("TOKEN VERIFY:");
  console.log(token);
  if (!token) {
    return next(errorHandler(401, "Please login to access this resource"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Please login to access this resource"));
    }
    req.user = user;
    console.log("USER: ", user);
    next();
  });
}
