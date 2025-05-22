const { addReason, getAll, getById, updateAll, remove } = require('../controllers/reason_lid.controller')

const router = require('express').Router()

router.post("/", addReason);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router