import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type { PaymentMethodChoice } from "@/lib/payment-methods";

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  size: string;
}

interface ShippingDetails {
  email: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postcode: string;
  country: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local",
        },
        { status: 500 }
      );
    }

    const body = (await req.json()) as {
      items: CheckoutItem[];
      shipping: ShippingDetails;
      paymentMethod: PaymentMethodChoice;
    };

    const { items, shipping, paymentMethod } = body;

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const amount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (amount <= 0) {
      return NextResponse.json({ error: "Invalid order amount" }, { status: 400 });
    }

    const stripe = getStripe();
    const customerName = `${shipping.firstName} ${shipping.lastName}`.trim();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
      receipt_email: shipping.email,
      metadata: {
        payment_method: paymentMethod,
        customer_name: customerName,
        customer_email: shipping.email,
        shipping_address: JSON.stringify({
          line1: shipping.addressLine1,
          line2: shipping.addressLine2 ?? "",
          city: shipping.city,
          postal_code: shipping.postcode,
          country: shipping.country,
        }),
        items: JSON.stringify(items),
      },
      ...(paymentMethod === "stripe"
        ? { automatic_payment_methods: { enabled: true } }
        : { payment_method_types: ["card"] }),
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentMethod,
      testMode: process.env.STRIPE_SECRET_KEY.startsWith("sk_test_"),
    });
  } catch (err) {
    console.error("Payment intent error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create payment intent";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
