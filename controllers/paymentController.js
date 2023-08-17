const stripe = require("stripe")("sk_test_51NdwltJlIK0RZcLUvFKXOUqm9lUbhi8WIDYfZCsP3hL2ihwLCcWsa8vB8bqbbbcUEDrXXBVIBsLuRVpg1fNPnW7j00Md3duA1U"); // Replace with your Stripe secret key
const Payment = require("../models/payment");
const errorHandler = (error, req, res) => {
  console.error("An error occurred:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

const OrdersAll = (req, res) => {
  Payment.find({startOrderFlag:true,onWayOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const GetOrder = (req, res) => {
  const orderId  = req.params.orderId;
    Payment.findById(orderId)
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const OrdersOnWay = (req, res) => {
  Payment.find({onWayOrderFlag:true,deliveredOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const OrdersDeliverd = (req, res) => {
  Payment.find({onWayOrderFlag:true,deliveredOrderFlag:true})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const GetUserOrders = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const GetUserOrdersPending = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const GetUserOrdersStarted = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:true,deliveredOrderFlag:false})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const GetUserOrdersDone = (req, res) => {
  const email  = req.params.email;
  Payment.find({email:email,startOrderFlag:true,onWayOrderFlag:true,deliveredOrderFlag:true})
    .then((data) => { 
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const PendingToOnWay = async (req, res) => {
    const OrderId  = req.params.id;
    const {user,startDeliverTime} =req.body
    const order = await Payment.findByIdAndUpdate(OrderId, {onWayOrderFlag:true,providerId:user._id,startDeliverTime:startDeliverTime}, { new: true });
    const updatedOrder = await order.save();
    res.json(updatedOrder);
};

const OnWayToDeliverd = async (req, res) => {
    const OrderId  = req.params.id;
    const {deliveredTime} = req.body;
    const order = await Payment.findByIdAndUpdate(OrderId, {deliveredOrderFlag:true,deliveredTime:deliveredTime}, { new: true });
    const updatedOrder = await order.save();
    res.json(updatedOrder);
};


async function createPayment(req, res) {
  try {
    const { paymentMethodId, email, phone,cardholder, amount,itemsCartData,itemsCartDataLocal } = req.body;


    const amountInUSD = amount; // Amount in USD
    const amountInCents = amountInUSD * 100; // Convert USD to cents

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amountInCents,
      currency: "usd", // Replace with the desired currency code
      confirm: true,
    });
    
    const payment = new Payment({
      paymentMethodId,
      email,
      phone,
      amount,
      itemsCartData,
      itemsCartDataLocal,
      cardholder,
    });
    await payment.save();

    res.json({ success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the payment." });
  }
}

module.exports = {
  createPayment,
  OrdersAll,
  OrdersOnWay,
  PendingToOnWay,
  OrdersDeliverd,
  OnWayToDeliverd,
  GetUserOrders,
  GetOrder,
  GetUserOrdersPending,
  GetUserOrdersStarted,
  GetUserOrdersDone,
};
