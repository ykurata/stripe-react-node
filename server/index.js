const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_IllR1H3Om8oeJnGT7UjtTCIS00fS8kHN59");
const uuid = require("uuid");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// route
app.get("/", (req, res) => {
  res.send("It workes");
});

// listen
app.listen(8282, () => console.log("Listening at port 8282"));
