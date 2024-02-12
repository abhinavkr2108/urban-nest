import Listing from "../models/listings.model.js";
import { errorHandler } from "../utils/error.js";

export async function createListing(req, res, next) {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (error) {
    next(error);
  }
}

export async function updateListings(req, res, next) {
  const listing = await Listing.findById(req.params.id);

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
}

export async function getListing(req, res, next) {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
}

export async function searchListings(req, res, next) {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;
    const page = req.query.page || 1;

    let furnished = req.query.furnished;
    let parking = req.query.parking;
    let type = req.query.type;
    let searchTerm = req.query.searchTerm || "";
    let sort = req.query.sort || "createdAt";
    let order = req.query.order || "desc";

    if (furnished === undefined || furnished === "" || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    if (parking === undefined || parking === "" || parking === "false") {
      parking = { $in: [false, true] };
    }
    if (type === undefined || type === "" || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      type: type,
      furnished: furnished,
      parking: parking,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
}
