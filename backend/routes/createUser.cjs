const express = require("express");
const router = express.Router();
const User = require("../models/User.cjs");
const { body, validationResult } = require("express-validator");

router.post(
  "/createuser",
  [
    body("email", "Given email is not in proper format.").isEmail(),
    body("name", "Name length is too short.").isLength({ min: 5 }),
    body("password", "Password length is too short.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log("Error : " + error.message);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Given email is not in proper format.").isEmail(),
    body("password", "Password length is too short.").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Email/Password is not correct." });
      }
      if (req.body.password !== userData.password) {
        return res
          .status(400)
          .json({ errors: "Email/Password is not correct." });
      }
      res.json({ success: true });
    } catch (error) {
      console.log("Error : " + error.message);
      res.json({ success: false });
    }
  }
);

module.exports = router;
