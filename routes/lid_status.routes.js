const { addStatus, getAll, getById, updateAll, remove } = require('../controllers/lid_status.controller')

const router = require('express').Router()

router.post("/", addStatus);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router