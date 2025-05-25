const { getAll, getById, updateAll, remove, addSLesson } = require('../controllers//student_lesson.controller')

const router = require('express').Router()

router.post("/", addSLesson);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router