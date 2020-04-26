const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/login",
    failureRedirect: "/incorrect",
  })
);

module.exports = router;
