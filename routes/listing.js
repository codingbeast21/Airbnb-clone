const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage  });


// const validateListing = validateListing = (req, res, next) => {
//   let { error } = listingSchema.validate(req.body);
//   if(error) {
//     let errMsg = error.details.map((el) => el.message).join(",");  
//     throw new ExpressError(400, errMsg);
//      } else {
//       next();
//      }
// };


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,  
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
    );
  // .post( upload.single("listing[image]"), (req, res) => {
  //   res.send(req.file);
  // });  

//New Route
router.get("/new", isLoggedIn, /*(req, res) => {
  console.log(req.user);
  res.render("listings/new.ejs");
 }*/listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn, 
    isOwner, 
    upload.single("listing[image]"),
    validateListing, 
    wrapAsync(listingController.updateListing))
  .delete(
    isLoggedIn, 
    isOwner, 
    wrapAsync(listingController.destroyListing));

// //Index Route
// router.get(
//   "/", 
//   wrapAsync(/*async (req, res) => {
//     const allListings = await Listing.find({});
//     res.render("listings/index.ejs", { allListings });
//  }*/listingController.index));

 
//  //Show Route
//  router.get("/:id", wrapAsync(/*async (req, res) => {
//      let { id } = req.params;
//      const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
//      if(!listing) {
//       req.flash("error", "Listing you requested for does not exist!");
//       res.redirect("/listings");
//      }
//      console.log(listing);
//      res.render("listings/show.ejs", { listing });
//  }*/listingController.showListing));

  // //create Route
  // router.post("/", isLoggedIn, validateListing, wrapAsync(/*async (req, res, next) => {
  //    const newListing = new Listing(req.body.listing);
  //    newListing.owner = req.user._id;
  //    await newListing.save();
  //    req.flash("success", "New Listing Created!");
  //    res.redirect("/listings");
  //  }*/listingController.createListing));

   //Edit Route
  router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(/*async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
     }
    res.render("listings/edit.ejs", { listing });
  }*/listingController.renderEditForm));
  
  //Update Route
  // router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(/*async (req, res) => {
  //   let { id } = req.params;
  //   // let listing = await Listing.findById(id);
  //   // if(!listing.owner.equals(res.locals.currUser._id)) {
  //   //   req.flash("error", "You don't have permission to edit");
  //   //   return res.redirect(`/listings/${id}`);
  //   // }
  //   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  //   req.flash("success", "Listing Updated!");
  //   res.redirect(`/listings/${id}`);
  // }*/listingController.updateListing));

  //Delete Route
  // router.delete("/:id", isLoggedIn, isOwner, wrapAsync(/*async (req, res) => {
  //   let { id } = req.params;
  //   let deletedListing = await Listing.findByIdAndDelete(id);
  //   console.log(deletedListing);
  //   req.flash("success", "Listing Deleted!");
  //   res.redirect("/listings");
  // }*/listingController.destroyListing));

  module.exports = router;