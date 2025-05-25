const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addStudent = async (req, res) => {
  try {
    const {lid_id, first_name, last_name, phone_number, birthday, male} = req.body;
    const result = await pool.query(
      `
        INSERT INTO student (lid_id, first_name, last_name, phone_number, birthday, male)
        values ($1, $2, $3, $4, $5, $6) RETURNING *
        `,
      [lid_id, first_name, last_name, phone_number, birthday, male]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM student`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM student WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { lid_id, first_name, last_name, phone_number, birthday, male } = req.body;
    const result = await pool.query(`
    UPDATE student SET lid_id=$1, first_name=$2, last_name=$3, phone_number=$4, birthday=$5, male=$6, WHERE id=$7 RETURNING *`,
    [lid_id, first_name, last_name, phone_number, birthday, male, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "student not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM student WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addStudent,
  getAll,
  getById,
  updateAll,
  remove
};
