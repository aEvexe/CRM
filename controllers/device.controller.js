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

const addDevice = async (req, res) => {
  try {
    const {user_id, token} = req.body;

    const userAgent = req.headers['user-agent'];
    const results = detector.detect(userAgent)
    const {device, os, client} = results
    // console.log('result parse', results)
    // console.log(DeviceHelper.isBrowser(results))


    const result = await pool.query(
      `
        INSERT INTO devoice_tokens (user_id, device, os, client, token)
        values ($1, $2, $3, $4, $5) RETURNING *
        `,
      [user_id, device, os, client, token]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getAll = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM devoice_tokens`);

    res.status(200).send(result.rows);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query(
      `
        SELECT * FROM devoice_tokens WHERE id=$1
        `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "devoice_tokens not found" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const updateAll = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, device, os, client, token} = req.body;
    const result = await pool.query(`
    UPDATE devoice_tokens SET user_id=$1, device=$2, os=$3, client=$4, token=$5 WHERE id=$6 RETURNING *`,
    [user_id, device, os, client, token, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "device_token topilmadi" });
    }

    res.status(200).send(result.rows[0]);
  } catch (error) {
    sendErrorResponse(error, res);
  }
};

const remove = async (req, res) => {
    try {
        const result = await pool.query(`
        DELETE FROM devoice_tokens WHERE id = $1
        RETURNING *
        `, [req.params.id])

    res.status(200).send({ message: "Deleted successfully", deletedStatus: result.rows[0] });
    } catch (error) {
        sendErrorResponse(error, res)
    }
}

module.exports = {
  addDevice,
  getAll,
  getById,
  updateAll,
  remove
};
