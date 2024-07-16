const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
   .route("/signup")
   .get(userController.renderSignupForm)
   .post(wrapAsync(userController.signup));
   
router
   .route("/login")
   .get(userController.renderLoginForm)
   .post(
    saveRedirectUrl,
    passport.authenticate("local", { 
    failureRedirect: "/login", 
    failureFlash: true, 
    }),
    userController.login
    ); 


// router.get("/signup", /*(req, res) => {
//     res.render("users/signup.ejs");
// }*/userController.renderSignupForm);

// router.post("/signup", wrapAsync(/*async (req, res) => {
//   try {
//     let { username, email, password } = req.body;
//   const newUser = new User({ email, username });
//   const registeredUser = await User.register(newUser, password);
//   console.log(registeredUser);
//   req.login(registeredUser, (err) => {
//     if(err) {
//       return next(err);
//     }
//     req.flash("success", "Welcome to Wanderlust!");
//     res.redirect("/listings");
//   });
// } catch(e) {
//      req.flash("error", e.message);
//      res.redirect("/signup");
//    }
//   }*/userController.signup)
// );


// router.get("/login", /*(req, res) => {
//     res.render("users/login.ejs");
// }*/userController.renderLoginForm);

// router.post(
//     "/login", saveRedirectUrl,
//     passport.authenticate("local", { 
//     failureRedirect: "/login", 
//     failureFlash: true, 
//     }), 
//     /*async(req, res) => {
//     req.flash("success", "Welcome back to Wanderlust!");
//     let redirectUrl = res.locals.redirectUrl || "/listings";
//     res.redirect(redirectUrl); 
// }*/userController.login);

router.get("/logout", /*(req, res) => {
    req.logout((err) => {
        if(err) {
           return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
}*/userController.logout);

module.exports = router; 