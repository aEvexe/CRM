const router = require('express').Router()
const stageRouter = require("./stage.routes")
const statusRouter = require('./lid_status.routes')
const reasonRouter = require('./reason_lid.routes')
const groupRouter = require('./group.routes')
const deviceRouter = require('./device.routes')

router.use("/stage", stageRouter);
router.use("/status", statusRouter);
router.use("/reason", reasonRouter);
router.use("/groups", groupRouter);
router.use("/devices", deviceRouter);

module.exports = router