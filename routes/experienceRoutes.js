const express = require("express");
const router = express.Router();
const {
    getAllExperiences,
    getUserExperiences,
    addExperience,
    updateExperience,
    deleteExperience,
    getExperienceById
} = require("../controllers/experienceController");
const { protect } = require("../middleware/authMiddleware");
// router.get("/all", getAllExperiences);
router.get("/one/:experienceId",protect,getExperienceById)
router.post("/add", addExperience);
router.get("/:userId", getUserExperiences);
router.put("/", protect, updateExperience);
router.delete("/:experienceId",protect,deleteExperience)
module.exports = router;
