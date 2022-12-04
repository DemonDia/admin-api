const express = require("express");
const router = express.Router();
const {
    getAllProjects,
    getUserProjects,
    addProject,
    getProjectById,
    updateProject,
    deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
// router.get("/all", getAllProjects);
router.get("/one/:projectId",protect,getProjectById)
router.post("/add", addProject);
router.get("/:userId", getUserProjects);
router.put("/", protect, updateProject);
router.delete("/:projectId",protect,deleteProject)
module.exports = router;
