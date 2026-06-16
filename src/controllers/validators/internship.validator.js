const isValidDate = (value) => {
  if (!value) return true;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

const validateInternship = (req, res, next) => {
  const { title, company, startDate, endDate, description } = req.body;

  if (!title || !company || !startDate || !description) {
    return res.status(400).json({ message: "Title, company, startDate, and description are required." });
  }

  if (!isValidDate(startDate) || (endDate && !isValidDate(endDate))) {
    return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
  }

  next();
};

const validateInternshipUpdate = (req, res, next) => {
  const { title, company, startDate, endDate, description, status } = req.body;

  if (!title && !company && !startDate && !endDate && !description && !status) {
    return res.status(400).json({ message: "At least one field must be provided for update." });
  }

  if ((startDate && !isValidDate(startDate)) || (endDate && !isValidDate(endDate))) {
    return res.status(400).json({ message: "Invalid date format for startDate or endDate." });
  }

  next();
};

module.exports = {
  validateInternship,
  validateInternshipUpdate,
};
