const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addReason = async (req, res) => {
  try {
    const {reason_lid} = req.body;
    const result = await pool.query(
      `
        INSERT INTO reason_lid (reason_lid)
        values ($1) RETURNING *
        `,
      [reason_lid]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM reason_lid`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM reason_lid WHERE id=$1
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
    const { reason_lid } = req.body;
    const result = await pool.query(`
    UPDATE reason_lid SET reason_lid=$1, WHERE id=$2 RETURNING *`,
    [reason_lid, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Reason topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM reason_lid WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addReason,
  getAll,
  getById,
  updateAll,
  remove
};
