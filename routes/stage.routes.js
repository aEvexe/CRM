const { addStage, getAll, getById, updateAll, remove } = require('../controllers/stage.controller')

const router = require('express').Router()

router.post("/", addStage);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router