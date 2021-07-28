const express = require("express");
const router = express.Router();
const { signup, signIn, changePassword, getUser } = require("../controllers/userController");
const auth = require('../middleware/auth')

router.get("/", auth, getUser);
router.post("/signup", signup);
router.patch("/changepassword/:userId", auth, changePassword)
router.post("/signin", signIn);

module.exports = router;
