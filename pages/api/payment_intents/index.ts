import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount } = req.body;

  try {
    const params: Stripe.PaymentIntentCreateParams = {
      amount: 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    };

    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.create(params);

    // const r = await stripe.charges.capture(paymentIntent.id, {
    //     amount: 100,
    //     currency: "usd",

    // })
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      customer: "cus_Jq8Z1ZQZQ2ZQ2Z",
      card: {
        number: "4242424242424242",
        exp_month: 8,
        exp_year: 2024,
        cvc: "314",
      },
    });

    console.log(paymentIntent);

    res.status(200).json(paymentIntent);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal server error";
    res.status(500).json({ statusCode: 500, message: errorMessage });
  }
}
