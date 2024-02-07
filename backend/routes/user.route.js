import exp from "constants";
import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyUserToken, updateUser);
router.delete("/delete/:id", verifyUserToken, deleteUser);

export default router;
