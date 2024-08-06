const { request } = require("express");
const User = require("../models/userModel");

const stripe = require("stripe")(
  "sk_test_51PfcxG2MUUnGf6Sk8L0z7C36trBOrwNw3Rolxj8gPOpBlL2SffwxJvawVIsgdx6QEJrov2pJyQOe1cra0dtKKehE00yJnytaRM"
);

const getCustomerByEmail = async (email) => {
  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    return customers.data[0];
  } catch (error) {
    console.error("Error retrieving customer:", error);
    throw error;
  }
};

const createCustomer2 = async (lastname, firstname, email) => {
  try {
    const customer = await stripe.customers.create({
      name: `${firstname} ${lastname}`,
      email: email,
      metadata: {
        start_date: new Date().toISOString(),
        plan_type: "starter",
      },
      payment_method: "pm_card_visa",
    });

    return customer;
  } catch (error) {
    console.log(error);
  }
};

const subscriptionDetail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let createdCustomer;
    const customer = await getCustomerByEmail(user.email);

    if (customer) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer?.id,
        status: "active",
        limit: 1,
      });

      if (subscriptions?.data[0]?.status === "active") {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: customer.id,
          return_url: "http://localhost:3000/subscription",
        });
        return res.status(202).json({ redirectUrl: stripeSession.url });
      } 
      else {
        createdCustomer = customer;
      }
    } else {
      createdCustomer = await createCustomer2(
        user.lastname,
        user.firstname,
        user.email
      );
    }

    const LineItem = {
      price_data: {
        currency: "gbp",
        product_data: {
          name: "Starter Subscription",
        },
        unit_amount: 39 * 100,
        recurring: {
          interval: "month",
        },
        
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      cancel_url: "http://localhost:3000/cancel",
      success_url: "http://localhost:3000/success",
      payment_method_types: ['card'],
      mode: "subscription",
      line_items: [LineItem],
      customer: createdCustomer?.id
    });


    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating subscription:", error);
    res.status(500).json({ error: error.message });
  }
};

const getStaterPlandetail = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const customer = await getCustomerByEmail(user.email);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found in Stripe" });
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
    });

    res.json(subscriptions);
  } catch (error) {
    console.error("Error retrieving customer:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  subscriptionDetail,
  getStaterPlandetail,
};
