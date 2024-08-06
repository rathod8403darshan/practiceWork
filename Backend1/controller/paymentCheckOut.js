const stripe = require("stripe")(
  "sk_test_51PfcxG2MUUnGf6Sk8L0z7C36trBOrwNw3Rolxj8gPOpBlL2SffwxJvawVIsgdx6QEJrov2pJyQOe1cra0dtKKehE00yJnytaRM"
);

const paymentCheckOut = async (req, res) => {
  const cartDetail = req.body;

  const LineItem = cartDetail?.map((item) => ({    
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product?.name,
        images: [item.product?.image],
        description: item.product?.detail,
      },
      unit_amount: Math.floor((item.product?.price  * (1 - item.product?.discount / 100)) * 100),
    },
    quantity: item?.quantity,
  }
));
  
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: LineItem,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  
  res.json({ id: session.id });
};

module.exports = {
  paymentCheckOut,
};
