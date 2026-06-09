import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
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

const VALID_METHODS: PaymentMethodChoice[] = [
  "card",
  "paypal",
  "stripe",
  "payoneer",
];

function buildSessionParams(
  origin: string,
  items: CheckoutItem[],
  shipping: ShippingDetails,
  paymentMethod: PaymentMethodChoice
): Stripe.Checkout.SessionCreateParams {
  const customerName = `${shipping.firstName} ${shipping.lastName}`.trim();
  const orderTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    mode: "payment",
    customer_email: shipping.email,
    line_items: items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: `Size: ${item.size}`,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&method=${paymentMethod}`,
    cancel_url: `${origin}/checkout?canceled=true&method=${paymentMethod}`,
    metadata: {
      payment_method: paymentMethod,
      customer_name: customerName,
      customer_email: shipping.email,
      order_total: String(orderTotal),
      shipping_address: JSON.stringify({
        line1: shipping.addressLine1,
        line2: shipping.addressLine2 ?? "",
        city: shipping.city,
        postal_code: shipping.postcode,
        country: shipping.country,
      }),
      items: JSON.stringify(
        items.map((i) => ({
          name: i.name,
          size: i.size,
          quantity: i.quantity,
          price: i.price,
        }))
      ),
    },
    payment_intent_data: {
      metadata: {
        payment_method: paymentMethod,
        customer_name: customerName,
        customer_email: shipping.email,
      },
    },
  };
}

async function createCheckoutSession(
  params: Stripe.Checkout.SessionCreateParams,
  paymentMethods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[]
) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    ...params,
    payment_method_types: paymentMethods,
  });
}

async function resolveStripeMethods(
  paymentMethod: PaymentMethodChoice,
  sessionParams: Stripe.Checkout.SessionCreateParams
): Promise<Stripe.Checkout.Session> {
  const attempts: Stripe.Checkout.SessionCreateParams.PaymentMethodType[][] =
    paymentMethod === "card"
      ? [["card"]]
      : paymentMethod === "paypal"
        ? [["paypal"]]
        : [["card", "link"], ["card"]];

  let lastError: unknown;

  for (const methods of attempts) {
    try {
      return await createCheckoutSession(sessionParams, methods);
    } catch (error) {
      lastError = error;
      console.warn(
        `Stripe checkout attempt failed for [${methods.join(", ")}]:`,
        error
      );
    }
  }

  if (paymentMethod === "paypal") {
    throw new Error(
      "PayPal is not enabled on your Stripe account. Enable it in Stripe Dashboard → Settings → Payment methods."
    );
  }

  throw lastError;
}

function buildPayoneerTestUrl(
  origin: string,
  shipping: ShippingDetails,
  items: CheckoutItem[]
) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const params = new URLSearchParams({
    email: shipping.email,
    total: String(total),
  });

  return `${origin}/checkout/payoneer-test?${params.toString()}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      items: CheckoutItem[];
      shipping: ShippingDetails;
      paymentMethod?: PaymentMethodChoice;
    };

    const { items, shipping, paymentMethod = "card" } = body;

    if (!VALID_METHODS.includes(paymentMethod)) {
      return NextResponse.json(
        { error: "Invalid payment method selected." },
        { status: 400 }
      );
    }

    if (!items?.length) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (
      !shipping?.email ||
      !shipping.firstName ||
      !shipping.lastName ||
      !shipping.addressLine1 ||
      !shipping.city ||
      !shipping.postcode
    ) {
      return NextResponse.json(
        { error: "Complete shipping details are required." },
        { status: 400 }
      );
    }

    const origin =
      process.env.NEXT_PUBLIC_SITE_URL ??
      req.headers.get("origin") ??
      "http://localhost:3000";

    if (paymentMethod === "payoneer") {
      const testUrl = buildPayoneerTestUrl(origin, shipping, items);
      return NextResponse.json({
        url: testUrl,
        sessionId: `test_payoneer_${Date.now()}`,
        paymentMethod,
        testMode: true,
      });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local for card, PayPal, and Stripe checkout.",
        },
        { status: 500 }
      );
    }

    const sessionParams = buildSessionParams(
      origin,
      items,
      shipping,
      paymentMethod
    );

    const session = await resolveStripeMethods(paymentMethod, sessionParams);

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      paymentMethod,
      testMode: process.env.STRIPE_SECRET_KEY.startsWith("sk_test_"),
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
