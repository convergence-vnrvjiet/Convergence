"use client";

import React, { useState } from "react";
import { Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { paymentApi, VerifyPaymentResponse } from "@/apis/payments";
import { loadRazorpayScript, RazorpayResponse } from "@/lib/razorpay";
import { cn } from "@/lib/utils";

export interface RazorpayPaymentButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onError"> {
  passType?: string;
  amount?: number;
  currency?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: VerifyPaymentResponse | RazorpayResponse) => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
  buttonText?: string;
  showIcon?: boolean;
  showSecureBadge?: boolean;
  variant?: "default" | "outline" | "secondary" | "brand";
  requireAuth?: boolean;
  directCheckout?: boolean;
}

export function RazorpayPaymentButton({
  passType = "Convergence Pass",
  amount,
  currency = "INR",
  prefill,
  onSuccess,
  onError,
  onCancel,
  buttonText = "Pay with Razorpay",
  showIcon = true,
  showSecureBadge = false,
  variant = "brand",
  requireAuth = false,
  directCheckout = false,
  className,
  disabled,
  children,
  ...props
}: RazorpayPaymentButtonProps) {
  const [status, setStatus] = useState<
    "idle" | "loading-sdk" | "creating-order" | "processing-payment" | "verifying"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLoading = status !== "idle";

  const getLoadingMessage = () => {
    switch (status) {
      case "loading-sdk":
        return "Loading Gateway...";
      case "creating-order":
        return "Creating Order...";
      case "processing-payment":
        return "Processing...";
      case "verifying":
        return "Verifying Payment...";
      default:
        return "Please wait...";
    }
  };

  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (requireAuth && !token) {
      const authErr = new Error("Please log in to proceed with payment.");
      setErrorMessage(authErr.message);
      if (onError) onError(authErr);
      return;
    }

    try {
      // 1. Load Razorpay Checkout Script
      setStatus("loading-sdk");
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || !window.Razorpay) {
        throw new Error("Failed to load Razorpay payment gateway SDK. Please check your internet connection.");
      }

      let orderData: { orderId?: string; amount?: number; currency?: string; keyId?: string } = {};

      // 2. Create Order on Backend if token is available and not forced direct checkout
      if (token && !directCheckout) {
        try {
          setStatus("creating-order");
          orderData = await paymentApi.createOrder();
        } catch (apiErr: any) {
          console.warn("Backend order creation failed, falling back to direct test mode:", apiErr);
        }
      }

      // 3. Open Razorpay Modal
      setStatus("processing-payment");

      const razorpayKey =
        orderData.keyId ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "rzp_test_BkDw4xdQUVrRpX";

      const finalAmount = orderData.amount || (amount ? amount * 100 : 49900);

      const options: any = {
        key: razorpayKey,
        amount: finalAmount,
        currency: orderData.currency || currency || "INR",
        name: "Convergence 2K26",
        description: `${passType} Registration`,
        image: "/logo-atom.png",
        prefill: {
          name: prefill?.name || "Test User",
          email: prefill?.email || "test@vnrvjiet.in",
          contact: prefill?.contact || "9876543210",
        },
        theme: {
          color: "#b91c1c", // theme red-700
          backdrop_color: "rgba(0, 0, 0, 0.7)",
        },
        handler: async (response: RazorpayResponse) => {
          if (token && orderData.orderId) {
            try {
              setStatus("verifying");
              const verifyResult = await paymentApi.verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                passType,
              });

              setStatus("idle");
              if (onSuccess) {
                onSuccess(verifyResult);
              }
            } catch (verifyError: any) {
              setStatus("idle");
              const err = new Error(verifyError?.message || "Payment verification failed.");
              setErrorMessage(err.message);
              if (onError) onError(err);
            }
          } else {
            setStatus("idle");
            if (onSuccess) {
              onSuccess(response);
            }
          }
        },
        modal: {
          ondismiss: () => {
            setStatus("idle");
            if (onCancel) onCancel();
          },
          escape: true,
          backdropclose: false,
        },
      };

      if (orderData.orderId) {
        options.order_id = orderData.orderId;
      }

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (err: any) {
      setStatus("idle");
      const caughtError = new Error(err?.message || "Something went wrong during payment initialization.");
      setErrorMessage(caughtError.message);
      if (onError) onError(caughtError);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "brand":
        return "bg-red-700 hover:bg-red-800 text-[#ede1c5] border border-red-800 shadow-sm active:scale-[0.99]";
      case "outline":
        return "border border-border bg-background hover:bg-muted text-foreground";
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      case "default":
      default:
        return "bg-foreground text-background hover:opacity-90";
    }
  };

  return (
    <div className="inline-flex flex-col items-center gap-1.5">
      <button
        type="button"
        disabled={disabled || isLoading}
        onClick={handlePayment}
        className={cn(
          "relative inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-all duration-150 disabled:pointer-events-none disabled:opacity-60",
          getVariantClasses(),
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-current" />
            <span>{getLoadingMessage()}</span>
          </>
        ) : children ? (
          children
        ) : (
          <>
            {showIcon && <CreditCard className="h-4 w-4 shrink-0 text-current" />}
            <span>{buttonText}</span>
            {amount && (
              <span className="ml-1 rounded bg-black/20 px-1.5 py-0.5 text-xs font-mono font-bold tracking-normal">
                ₹{amount}
              </span>
            )}
          </>
        )}
      </button>

      {showSecureBadge && (
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground tracking-wide uppercase">
          <ShieldCheck className="h-3 w-3 text-green-600" />
          <span>Secured by Razorpay</span>
        </div>
      )}

      {errorMessage && (
        <p className="text-xs font-medium text-red-500 mt-1 max-w-xs text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default RazorpayPaymentButton;
