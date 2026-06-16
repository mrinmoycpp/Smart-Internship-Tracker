const pool = require("../config/db");

const createInternship = async (userId, data) => {
  const {
    title,
    company,
    startDate,
    endDate,
    description,
    status = "open",
  } = data;

  const result = await pool.query(
    `INSERT INTO internships (user_id, title, company, start_date, end_date, description, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [userId, title, company, startDate, endDate, description, status]
  );

  return result.rows[0];
};

const getInternshipsByUser = async (userId) => {
  const result = await pool.query(
    "SELECT * FROM internships WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};

const getInternshipById = async (userId, internshipId) => {
  const result = await pool.query(
    "SELECT * FROM internships WHERE id = $1 AND user_id = $2",
    [internshipId, userId]
  );
  return result.rows[0];
};

const updateInternship = async (userId, internshipId, data) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      const column = key === "startDate" ? "start_date" : key === "endDate" ? "end_date" : key;
      fields.push(`${column} = $${index}`);
      values.push(value);
      index += 1;
    }
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(internshipId, userId);
  const query = `UPDATE internships SET ${fields.join(", ")} WHERE id = $${index} AND user_id = $${index + 1} RETURNING *`;
  const result = await pool.query(query, values);

  return result.rows[0];
};

const deleteInternship = async (userId, internshipId) => {
  const result = await pool.query(
    "DELETE FROM internships WHERE id = $1 AND user_id = $2 RETURNING id",
    [internshipId, userId]
  );

  return result.rowCount > 0;
};

module.exports = {
  createInternship,
  getInternshipsByUser,
  getInternshipById,
  updateInternship,
  deleteInternship,
};
