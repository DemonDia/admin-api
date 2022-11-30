const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/registration", registerUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/me",protect,getMe)

module.exports = router;
