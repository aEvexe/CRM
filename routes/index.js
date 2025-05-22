const router = require('express').Router()
const stageRouter = require("./stage.routes")
const statusRouter = require('./lid_status.routes')
const reasonRouter = require('./reason_lid.routes')

router.use("/stage", stageRouter);
router.use("/status", statusRouter);
router.use("/reason", reasonRouter);

module.exports = router