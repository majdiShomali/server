const express = require("express");
const paymentController = require("../controllers/paymentController");

const router = express.Router();

router.post("/api/charge", paymentController.createPayment);
router.get("/api/OrdersAll", paymentController.OrdersAll);
router.get("/api/OrdersOnWay", paymentController.OrdersOnWay);
router.get("/api/GetUserOrders/:email", paymentController.GetUserOrders);
router.get("/api/OrdersDeliverd", paymentController.OrdersDeliverd);
router.put("/api/PendingToOnWay/:id", paymentController.PendingToOnWay);
router.put("/api/OnWayToDeliverd/:id", paymentController.OnWayToDeliverd);

module.exports = router;
