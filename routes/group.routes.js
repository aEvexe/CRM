const { getAll, getById, updateAll, remove, addGroup } = require('../controllers/group.controller')

const router = require('express').Router()

router.post("/", addGroup);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router