const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getMe,
    verifyUser,
    sendForgetPasswordEmail,
    changeNewPassword,
    changeUserName,
    deleteAccount
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
router.post("/registration", registerUser);
router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.put("/verify/:userId/:token", verifyUser);
router.put("/resetpass", sendForgetPasswordEmail);
router.post("/changepass",changeNewPassword);
router.put("/changename",protect,changeUserName);
router.delete("/:userId",protect,deleteAccount);
module.exports = router;
