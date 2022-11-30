const express = require("express")
const router = express.Router()
const {registerUser, loginUser, getAllUsers} = require("../controllers/userController")

router.post("/registration",registerUser)
router.get("/",getAllUsers)
router.post("/login",loginUser)

module.exports = router