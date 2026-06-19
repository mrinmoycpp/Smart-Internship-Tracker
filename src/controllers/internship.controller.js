const internshipService = require("./services/internship.service");

const createInternship = async (req, res) => {
  try {
    const userId = req.user?.id;
    const internship = await internshipService.createInternship(userId, req.body);

    return res.status(201).json({
      message: "Internship created successfully",
      internship,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getInternships = async (req, res) => {
  try {
    const userId = req.user?.id;
    const internships = await internshipService.getInternshipsByUser(userId);

    return res.json({ internships });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getInternshipById = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const internship = await internshipService.getInternshipById(userId, id);

    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.json({ internship });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getSavedInternships = async (req, res) => {
  try {
    const userId = req.user?.id;
    const savedInternships = await internshipService.getSavedInternshipsByUser(userId);

    return res.json({ savedInternships });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateInternship = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const updated = await internshipService.updateInternship(userId, id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Internship not found or no changes made" });
    }

    return res.json({
      message: "Internship updated successfully",
      internship: updated,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteInternship = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deleted = await internshipService.deleteInternship(userId, id);

    if (!deleted) {
      return res.status(404).json({ message: "Internship not found" });
    }

    return res.json({ message: "Internship deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createInternship,
  getInternships,
  getInternshipById,
  updateInternship,
  deleteInternship,
  getSavedInternships,
};
