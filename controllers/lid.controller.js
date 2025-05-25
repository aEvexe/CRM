const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addLid = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, target_id, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id} = req.body;
    const result = await pool.query(
      `
        INSERT INTO lid (first_name, last_name, phone_number, target_id, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
        `,
      [first_name, last_name, phone_number, target_id, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM lid`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM lid WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "lid not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, phone_number, target_id, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id} = req.body;
    const result = await pool.query(`
    UPDATE student SET first_name=$1, last_name=$2, phone_number=$3, target_id=$4, lid_stage_id=$5, test_date=$6, trial_lesson_date=$7, trial_lesson_time=$8, trial_lesson_group_id=$9, lid_status_id=$10, cancel_reason_id=$11, WHERE id=$12 RETURNING *`,
    [first_name, last_name, phone_number, target_id, lid_stage_id, test_date, trial_lesson_date, trial_lesson_time, trial_lesson_group_id, lid_status_id, cancel_reason_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "lid not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM lid WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addLid,
  getAll,
  getById,
  updateAll,
  remove
};
