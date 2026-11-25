const express = require("express");
const {signup, login, dummy} = require("../controllers/userController");
const router = express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.get("/verify",dummy)


module.exports =router;