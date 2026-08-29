import Razorpay from 'razorpay';
import crypto from 'crypto';
import { insertPayment, updateUserPassStatus, getPaymentByOrderId } from './db.js';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const PASS_PRICE = 499;

export const createOrder = async () => {
  const amountInPaise = PASS_PRICE * 100;

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `conv_pass_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    notes: {
      item: 'Convergence Pass 2K26',
      app: 'Convergence 2K26',
    },
  });

  return {
    orderId: order.id,
    amount: amountInPaise,
    currency: order.currency,
    keyId: process.env.RAZORPAY_KEY_ID,
  };
};

export const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};

export const recordPaymentAndActivatePass = async (userId, { orderId, paymentId, signature, passType = 'Convergence Pass' }) => {
  const existing = await getPaymentByOrderId(orderId);
  if (existing) {
    return { payment: existing, alreadyRecorded: true };
  }

  const amountInPaise = PASS_PRICE * 100;

  const paymentRecord = await insertPayment({
    userId,
    passType,
    amount: amountInPaise,
    currency: 'INR',
    razorpayOrderId: orderId,
    razorpayPaymentId: paymentId,
    razorpaySignature: signature,
    status: 'paid',
    paidAt: new Date().toISOString(),
  });

  await updateUserPassStatus(userId, 'Active');

  return { payment: paymentRecord, alreadyRecorded: false };
};
