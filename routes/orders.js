let router = require('express').Router();
const { authenticateUser } = require("../controller/authController");
const { createOrder, updateOrder } = require("../controller/ordersController")

router.post("/", authenticateUser, createOrder);
router.put("/:id", authenticateUser, updateOrder);

module.exports = router;