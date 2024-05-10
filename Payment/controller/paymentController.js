// const asyncHandler = require("express-async-handler");
// const Payment = require("../models/paymentModel");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import asyncHandler from "express-async-handler";
import Payment from "../model/paymentModel.js";
import stripe from "stripe";
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

//@desc Create New Payment
//@route POST /api/payment
//@access private
const createPayment = asyncHandler(async (req, res) => {
  try {
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        return {
          price_data: {
            currency: "lkr",
            product_data: {
              name: item.name,
              images: [item.images],
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: "http://127.0.0.1:3000/success",
      cancel_url: "http://127.0.0.1:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export { createPayment };
