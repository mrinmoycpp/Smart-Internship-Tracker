const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
} = require("../internship.controller");
const {
  validateInternship,
  validateInternshipUpdate,
} = require("../validators/internship.validator");

const router = express.Router();

router.get("/", authMiddleware, getInternships);
router.get("/:id", authMiddleware, getInternshipById);
router.post("/", authMiddleware, validateInternship, createInternship);
router.put("/:id", authMiddleware, validateInternshipUpdate, updateInternship);
router.delete("/:id", authMiddleware, deleteInternship);

module.exports = router;
