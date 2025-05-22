const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const result = await pool.query(
      `
        INSERT INTO lid_status (status)
        values ($1) RETURNING *
        `,
      [status]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM lid_status`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM lid_status WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "stats not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await pool.query(`
    UPDATE lid_status SET status=$1, WHERE id=$2 RETURNING *`,
    [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Status topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM lid_status WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addStatus,
  getAll,
  getById,
  updateAll,
  remove
};
