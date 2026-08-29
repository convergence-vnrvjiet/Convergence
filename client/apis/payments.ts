import { fetchClient } from './apiClient';

export interface CreateOrderResponse {
  message: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId?: string;
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  passType?: string;
}

export interface VerifyPaymentResponse {
  message: string;
  payment?: any;
}

export const paymentApi = {
  createOrder: (): Promise<CreateOrderResponse> =>
    fetchClient('/payment/create-order', {
      method: 'POST',
    }),

  verifyPayment: (data: VerifyPaymentPayload): Promise<VerifyPaymentResponse> =>
    fetchClient('/payment/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
