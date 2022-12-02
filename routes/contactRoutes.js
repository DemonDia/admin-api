const express = require("express");
const router = express.Router();
const {
    getAllContacts,
    getUserContacts,
    addContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");
const { protect } = require("../middleware/authMiddleware");
router.get("/all", getAllContacts);
router.post("/add", protect, addContact);
router.get("/:userId", protect, getUserContacts);
router.put("/", protect, updateContact);
router.delete("/:experienceId", protect, deleteContact);
module.exports = router;
