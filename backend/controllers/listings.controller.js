import Listing from "../models/listings.model.js";

export async function createListing(req, res, next) {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
}
