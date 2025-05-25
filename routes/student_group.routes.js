const { getAll, getById, updateAll, remove, addSGroup } = require('../controllers/student_group.controller')

const router = require('express').Router()

router.post("/", addSGroup);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router