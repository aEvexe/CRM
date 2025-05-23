const { sendErrorResponse } = require("../helpers/send_error_res");
const DeviceDetector = require('node-device-detector');
const DeviceHelper = require('node-device-detector/helper');
const pool = require("../config/db");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  osIndexes: true,
  deviceAliasCode: false,
  deviceTrusted: false,
  deviceInfo: false,
  maxUserAgentSize: 500,
});

const addStage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newStage = await pool.query(
      `
        INSERT INTO stage (name, description)
        values ($1, $2) RETURNING *
        `,
      [name, description]
    );
    res.status(201).send(newStage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    console.log(userAgent)

    const result = detector.detect(userAgent)
    console.log('result parse', result)
    console.log(DeviceHelper.isBrowser(result))

    const allStage = await pool.query(`SELECT * FROM stage`);

    res.status(200).send(allStage.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const stage = await pool.query(
      `
        SELECT * FROM stage WHERE id=$1
        `,
      [req.params.id]
    );

    if (stage.rows.length === 0) {
      return res.status(404).send({ message: "Stage not found" });
    }

    res.status(200).send(stage.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const result = await pool.query(`
    UPDATE stage SET name=$1, description=$2 WHERE id=$3 RETURNING *`,
    [name, description, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Stage topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM stage WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStage: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addStage,
  getAll,
  getById,
  updateAll,
  remove
};
