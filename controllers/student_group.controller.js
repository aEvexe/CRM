const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addSGroup = async (req, res) => {
  try {
    const {student_id, group_id} = req.body;
    const result = await pool.query(
      `
        INSERT INTO student_lesson (student_id, group_id)
        values ($1, $2) RETURNING *
        `,
      [student_id, group_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM student_group`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM student_group WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student_group not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, group_id } = req.body;
    const result = await pool.query(`
    UPDATE branch SET student_id=$1, group_id=$2, WHERE id=$3 RETURNING *`,
    [student_id, group_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student_group not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM student_group WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addSGroup,
  getAll,
  getById,
  updateAll,
  remove
};
