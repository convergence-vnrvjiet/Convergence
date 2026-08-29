import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  createOrder,
  verifyPaymentSignature,
  recordPaymentAndActivatePass,
} from '../services/razorpayService.js';

const router = express.Router();

router.post('/create-order', verifyToken, async (req, res) => {
  try {
    const orderData = await createOrder();

    res.status(200).json({
      message: 'Order created successfully',
      ...orderData,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error.message);
    res.status(500).json({ message: error.message });
  }
});

router.post('/verify', verifyToken, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, passType } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        message: 'Missing required fields: razorpay_order_id, razorpay_payment_id, razorpay_signature',
      });
    }

    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature. Payment verification failed.' });
    }

    const userId = req.user.id;
    const { payment, alreadyRecorded } = await recordPaymentAndActivatePass(userId, {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      passType: passType || 'standard',
    });

    res.status(alreadyRecorded ? 200 : 201).json({
      message: alreadyRecorded ? 'Payment already recorded' : 'Payment verified and pass activated',
      payment,
    });
  } catch (error) {
    console.error('Error verifying payment:', error.message);
    res.status(500).json({ message: 'Payment verification failed. Please contact support.' });
  }
});

export default router;
