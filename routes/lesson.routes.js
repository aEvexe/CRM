const { addLesson, getAll, getById, updateAll, remove } = require('../controllers/lesson.controller')

const router = require('express').Router()

router.post("/", addLesson);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router