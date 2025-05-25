const { getAll, getById, updateAll, remove, addStudent } = require('../controllers/student.controller')

const router = require('express').Router()

router.post("/", addStudent);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router