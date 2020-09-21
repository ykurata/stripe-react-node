const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_IllR1H3Om8oeJnGT7UjtTCIS00fS8kHN59");
const { v4: uuidv4 } = require("uuid");
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/", (req, res) => {
  res.send("It workes");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("product", product);
  console.log("price", product.price);
  const idempotencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "cad",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
          // shipping: {
          //   name: token.card.name,
          //   address: {
          //     country: token.card.address_country,
          //   },
          // },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

// listen
app.listen(8282, () => console.log("Listening at port 8282"));
