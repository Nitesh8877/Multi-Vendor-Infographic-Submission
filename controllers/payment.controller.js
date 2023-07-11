
const Payment = require('../models/payment.model');

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { user, content, amount } = req.body;
    const payment = new Payment({
      user,
      content,
      amount,
    });
    await payment.save();
    res.status(201).send({
        message:"payment successful",
        invoice:payment
    });
  } catch (error) {
    res.status(500).send({ 
        message:"Something went wrong",
        error: error.message 
    });
  }
};

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).send({
        message:"All payment details",
        Transaction:payments
    });
  } catch (error) {
    res.status(500).send({ 
        message:"Something went wrong",
        error: error.message 
    });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      res.status(404).send({ message: 'Payment not found' });
    } else {
      res.status(200).send({
        message:"find payment details",
        invoice:payment
      });
    }
  } catch (error) {
    res.status(500).send({ 
        message:"Something went wrong",
        error: error.message 
    });
  }
};

