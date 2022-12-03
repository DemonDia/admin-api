const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe,
    verifyUser
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/registration", registerUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/me",protect,getMe)
router.put("/verify/:userId",verifyUser)

module.exports = router;
