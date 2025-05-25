const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addSLesson = async (req, res) => {
  try {
    const {lesson_id, student_id, is_there, reason, be_paid} = req.body;
    const result = await pool.query(
      `
        INSERT INTO student_lesson (lesson_id, student_id, is_there, reason, be_paid)
        values ($1, $2, $3, $4, $5) RETURNING *
        `,
      [lesson_id, student_id, is_there, reason, be_paid]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM student_lesson`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM student_lesson WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student_lesson not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, call_number } = req.body;
    const result = await pool.query(`
    UPDATE branch SET lesson_id=$1, student_id=$2, is_there=$3, reason=$4, be_paid=$5, WHERE id=$6 RETURNING *`,
    [lesson_id, student_id, is_there, reason, be_paid, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student_lesson topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM student_lesson WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addSLesson,
  getAll,
  getById,
  updateAll,
  remove
};
