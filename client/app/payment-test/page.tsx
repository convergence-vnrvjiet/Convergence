"use client";

import { RazorpayPaymentButton } from "@/components/razorpay-payment-button";

export default function PaymentTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <RazorpayPaymentButton
        amount={499}
        passType="Convergence 2K26 Pass"
        onSuccess={(res: any) => {
          const paymentId = res.razorpay_payment_id || res.payment?.razorpayPaymentId || "Success";
          alert(`Payment Successful! Payment ID: ${paymentId}`);
        }}
        onError={(err) => {
          alert(`Payment Error: ${err.message}`);
        }}
        onCancel={() => {
          console.log("Payment modal closed by user");
        }}
      />
    </div>
  );
}
