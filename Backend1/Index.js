require("./db/db");
const express = require("express");
const router = require("./router/rootRouter");
const app = express();
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const { generateToken } = require("./middleware/tokenMiddleware");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(
  "sk_test_51PfcxG2MUUnGf6Sk8L0z7C36trBOrwNw3Rolxj8gPOpBlL2SffwxJvawVIsgdx6QEJrov2pJyQOe1cra0dtKKehE00yJnytaRM"
);

const PORT = 7000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("hello");
});
app.post("/webhook", async (req, res) => {
  let event = req.body;
  // Handle the event
  console.log(event.type);

  switch (event.type) {
    // case "customer.subscription.created":
    //   const subscriptionCreated = event.data.object;
    //   console.log("Subscription created:", subscriptionCreated);
    //   break;
    // case "customer.subscription.updated":
    //   const subscriptionUpdated = event.data.object;
    //   console.log("update:", subscriptionUpdated.status);
    //   console.log("update:", subscriptionUpdated.status);
    //   break;
    // case "customer.subscription.deleted":
    //   const subscriptionDeleted = event.data.object;
    //   console.log("delete:", subscriptionDeleted);
    //   break;
    
    
    // case "checkout.session.completed":
      //   const subscription1 = await stripe.subscriptions.create({
      //     customer: "cus_QYvNZRLNpr5XlY",
      //     items: [{ price: 'price_1Pg0Bm2MUUnGf6SkvX84A4co' }],
      //     billing_cycle_anchor: Math. floor(Date.now() / 1000) + 10, 
      //  });

      //  console.log("yyyyyyyyyyyy",subscription1);
       
      // break;


    case "payment_intent.payment_failed":
      const paymentIntentFailed = event.data.object;
      console.log("Payment failed:", paymentIntentFailed.customer);
      console.log("Error message:", paymentIntentFailed?.last_payment_error?.message);

      const CustomerId = paymentIntentFailed.customer
      if (CustomerId) {
        
        try {
          const subscriptions = await stripe.subscriptions.list({
            customer: CustomerId,
            limit: 1,
          });
          
              console.log(subscriptions.data[0].id,"Sub");
              const subscription12 = await stripe.subscriptions.cancel(
                subscriptions.data[0].id
              );
              console.log(subscription12,"remove success"); 
          
          } catch (error) {
            console.error(`Error removing subscription with ID :`, error);
          }
      }



      break;
    case "payment_intent.created":
      const subscriptionIntent = event.data.object;
      break;
    default:
      // console.log(` ${event.type}`);
  }

  // console.log(req.body , "req.body");

  res.json({ received: true });
});

app.post("/api/refreshToken", async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided"});
  }

  try {
    jwt.verify(refreshToken, "refreshTokenKey", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      const { accessToken } = generateToken(decoded);
      res.json({ accessToken });
    });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log("app is running on port 7000");
});
