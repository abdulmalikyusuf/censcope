import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const paystackSecretKey = process.env.PAYSTACK_SECRET_KEY;
    
    if (!paystackSecretKey) {
      console.error("PAYSTACK_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payment verification service is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Payment verification failed" },
        { status: response.status }
      );
    }

    if (data.status && data.data.status === "success") {
      // Payment was successful
      // You can save this to your database here
      // Example: await saveDonation(data.data);

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        data: {
          reference: data.data.reference,
          amount: data.data.amount / 100, // Convert from kobo to naira
          email: data.data.customer.email,
          metadata: data.data.metadata,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
