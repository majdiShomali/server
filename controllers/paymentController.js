const stripe = require("stripe")("sk_test_51NdwltJlIK0RZcLUvFKXOUqm9lUbhi8WIDYfZCsP3hL2ihwLCcWsa8vB8bqbbbcUEDrXXBVIBsLuRVpg1fNPnW7j00Md3duA1U"); // Replace with your Stripe secret key
const Payment = require("../models/payment");

async function createPayment(req, res) {
  try {
    const { paymentMethodId, email, amount } = req.body;

    // Create a payment intent using the Stripe API
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: amount,
      currency: "usd", // Replace with the desired currency code
      confirm: true,
    });
    // Save the payment information to your MongoDB database
    const payment = new Payment({
      paymentMethodId,
      email,
      amount,
      // Add more fields as needed
    });
    await payment.save();

    // Send a response to the client indicating the success of the payment
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while processing the payment." });
  }
}

module.exports = {
  createPayment,
};
