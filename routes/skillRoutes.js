const express = require("express");
const router = express.Router();
const {
    getAllSkills,
    addSkill,
    getUserSkills,
    updateSkill,
    deleteSkill
} = require("../controllers/skillController");
const { protect } = require("../middleware/authMiddleware");
// router.get("/all", getAllSkills);
router.post("/add", protect, addSkill);
router.get("/:userId", getUserSkills);
router.put("/", protect, updateSkill);
router.delete("/:skillId",protect,deleteSkill)
module.exports = router;
