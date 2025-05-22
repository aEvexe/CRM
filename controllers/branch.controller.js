const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addBranch = async (req, res) => {
  try {
    const {name, address, call_number} = req.body;
    const result = await pool.query(
      `
        INSERT INTO branch (name, address, call_number)
        values ($1, $2, $3) RETURNING *
        `,
      [name, address, call_number]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM branch`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM branch WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "branch not found" });
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
    UPDATE branch SET name=$1, address=$2, call_number=$3, WHERE id=$4 RETURNING *`,
    [name, address, call_number, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "branch topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM branch WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addBranch,
  getAll,
  getById,
  updateAll,
  remove
};
