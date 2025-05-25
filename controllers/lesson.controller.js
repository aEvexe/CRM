const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addLesson = async (req, res) => {
  try {
    const {lesson_theme, lesson_number, group_id, lesson_date} = req.body;
    const result = await pool.query(
      `
        INSERT INTO lesson (lesson_theme, lesson_number, group_id, lesson_date)
        values ($1, $2, $3, $4) RETURNING *
        `,
      [lesson_theme, lesson_number, group_id, lesson_date]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM lesson`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM lesson WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "lesson not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { lesson_theme, lesson_number, group_id, lesson_date} = req.body;
    const result = await pool.query(`
    UPDATE branch SET lesson_theme=$1, lesson_number=$2, group_id=$3, lesson_date=$4, WHERE id=$5 RETURNING *`,
    [lesson_theme, lesson_number, group_id, lesson_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "lesson not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM lesson WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addLesson,
  getAll,
  getById,
  updateAll,
  remove
};
