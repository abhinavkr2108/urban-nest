import exp from "constants";
import express from "express";
import {
  test,
  updateUser,
  deleteUser,
  getUserListings,
  deleteUserListing,
  getUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);
router.get("/listings/:id", getUserListings);
router.delete("/delete-listing/:id", verifyUserToken, deleteUserListing);
router.get("/:id", verifyUserToken, getUser);

export default router;
