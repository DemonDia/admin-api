const express = require("express");
const router = express.Router();
const {
    getAllExperiences,
    getUserExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
} = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");
router.get("/all", getAllExperiences);
router.post("/add", protect, addExperience);
router.get("/:userId", protect, getUserExperiences);
router.put("/", protect, updateExperience);
router.delete("/:skillId",protect,deleteExperience)
module.exports = router;
