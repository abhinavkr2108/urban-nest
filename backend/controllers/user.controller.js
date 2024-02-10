import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import Listing from "../models/listings.model.js";
export function test(req, res) {
  res.json({ message: "Hello World Message Changed" });
}

export async function updateUser(req, res, next) {
  const { username, email, newPassword, cnewpassword } = req.body;
  console.log(req.body);
  if (newPassword !== cnewpassword) {
    return next(
      errorHandler(400, "Password and Confirm password do not match")
    );
  }

  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    const updatePassword = bcryptjs.hashSync(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: username,
          email: email,
          password: updatePassword,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    console.log(updatedUser);
    const token = jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET);
    console.log("TOKEN ", token);

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json({ user: rest, token: token });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}
/**
 * Retrieves a list of user listings.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {Promise} a promise representing the asynchronous operation
 */
export async function getUserListings(req, res, next) {
  // if (req.user.id !== req.params.id) {
  //   return next(errorHandler(401, "You can only view your own listings!"));
  // }
  try {
    const user = await User.findById(req.params.id);
    const listings = await Listing.find({ userRef: req.params.id });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}

/**
 * Deletes a user listing if the user owns it.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {Promise<void>} Promise that resolves when the listing is deleted
 */
export async function deleteUserListing(req, res, next) {
  const listing = await Listing.findById(req.params.id);
  if (listing.userRef.toString() !== req.user.id) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  try {
    await Listing.findByIdAndDelete(req.params.id);
  } catch (error) {
    next(error);
  }
}
