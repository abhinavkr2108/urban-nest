import express from "express";
import {
  createListing,
  getListing,
  searchListings,
  updateListings,
} from "../controllers/listings.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyUserToken, createListing);
router.patch("/update/:id", verifyUserToken, updateListings);
router.get("/get-listing/:id", getListing);
router.get("/get", searchListings);

export default router;
