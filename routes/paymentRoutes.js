const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/api/charge", paymentController.createPayment);

module.exports = router;
