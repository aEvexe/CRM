const { sendErrorResponse } = require("../helpers/send_error_res");
const pool = require("../config/db");

const addGroup = async (req, res) => {
  try {
    const {name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity, is_active} = req.body;
    const result = await pool.query(
      `
        INSERT INTO "group" (name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity, is_active)
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *
        `,
      [name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity, is_active]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM group`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM group WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "group not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity, is_active } = req.body;
    const result = await pool.query(`
    UPDATE group SET name=$1, lesson_start_time=$2, lesson_end_time=$3, lesson_week_day=$4, stage_id=$5, branch_id=$6, room_floor=$7, room=$8, lessons_quantity=$9, is_active=$10, WHERE id=$11 RETURNING *`,
    [name, lesson_start_time, lesson_end_time, lesson_week_day, stage_id, branch_id, room_floor, room, lessons_quantity, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "group topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM group WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addGroup,
  getAll,
  getById,
  updateAll,
  remove
};
