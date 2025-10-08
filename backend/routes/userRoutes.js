const express = require("express");
const router = express.Router();
const {registerUser,loginUser, getUserProfile} = require("../controllers/userController");
const validateToken = require("../middleware/validateToken");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", validateToken, getUserProfile);

module.exports = router;
