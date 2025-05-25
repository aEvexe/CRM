const {  getAll, getById, updateAll, remove, addPayment } = require('../controllers/payment.controller')

const router = require('express').Router()

router.post("/", addPayment);
router.get("/all", getAll);
router.get("/:id", getById);
router.patch("/:id", updateAll);
router.delete("/:id", remove);

module.exports = router