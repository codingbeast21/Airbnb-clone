const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
//const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js")
const review = require("../models/review.js");

// const validateReview = (req, res, next) => {
//   let { error } = reviewSchema.validate(req.body);
//   if(error) {
//     let errMsg = error.details.map((el) => el.message).join(",");  
//     throw new ExpressError(400, errMsg);
//      } else {
//       next();
//      }
// };

  //Post Review Route
  router.post("/", isLoggedIn, validateReview, wrapAsync(/*async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log("new review saved");
    res.redirect(`/listings/${listing._id}`);
}*/reviewController.createReview)); 

//Delete review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(/*async (req, res) => {
let { id, reviewId } = req.params;

await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
await review.findByIdAndDelete(reviewId);
req.flash("success", "Review Deleted!");
res.redirect(`/listings/${id}`);
}*/reviewController.destroyReview));

module.exports = router;