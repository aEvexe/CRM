const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addPayment = async (req, res) => {
  try {
    const {student_id, payment_last_date, payment_date, price, is_paid, total_attent} = req.body;
    const result = await pool.query(
      `
        INSERT INTO student (student_id, payment_last_date, payment_date, price, is_paid, total_attent)
        values ($1, $2, $3, $4, $5, $6) RETURNING *
        `,
      [student_id, payment_last_date, payment_date, price, is_paid, total_attent]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM payment`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM payment WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "payment not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const {student_id, payment_last_date, payment_date, price, is_paid, total_attent} = req.body;
    const result = await pool.query(`
    UPDATE payment SET student_id=$1, payment_last_date=$2, payment_date=$3, price=$4, is_paid=$5, total_attent=$6, WHERE id=$7 RETURNING *`,
    [student_id, payment_last_date, payment_date, price, is_paid, total_attent, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "payment not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM payment WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addPayment,
  getAll,
  getById,
  updateAll,
  remove
};
