const express = require("express");
const router = express.Router();
const {
  adminRegister,
  loginUser,
  studentRegister,
} = require("../controllers/auth.controller");

// admin register route
router.post("/admin/register", adminRegister);

// login
router.post("/login", loginUser);

// student register
router.post("/register", studentRegister);

module.exports = router;
