const router = require('express').Router()
const stageRouter = require("./stage.routes")
const statusRouter = require('./lid_status.routes')
const reasonRouter = require('./reason_lid.routes')
const groupRouter = require('./group.routes')
const deviceRouter = require('./device.routes')
const lessonRouter = require('./lesson.routes')
const lidRouter = require('./lid.routes')
const paymentRouter = require('./payment.routes')
const studentGroupRouter = require('./student_group.routes')
const studentLessonRouter = require('./student_lesson.routes')
const studentRouter = require('./student.routes')

router.use("/stage", stageRouter);
router.use("/status", statusRouter);
router.use("/reason", reasonRouter);
router.use("/groups", groupRouter);
router.use("/devices", deviceRouter);
router.use("/lessons", lessonRouter);
router.use("/lids", lidRouter);
router.use("/payments", paymentRouter);
router.use("/student-group", studentGroupRouter);
router.use("/student-lesson", studentLessonRouter);
router.use("/students", studentRouter);

module.exports = router