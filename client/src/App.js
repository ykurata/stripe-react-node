import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 10,
    productBy: "facebook",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    // return axios
    //   .post("/payment", body)
    //   .then((response) => {
    //     console.log("Response ", response);
    //     const { status } = response;
    //     console.log("Status ", status);
    //   })
    //   .catch((err) => console.log(err));

    return fetch("http://localhost:8282/payment", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("Response ", response);
        const { status } = response;
        console.log("Status ", status);
      })
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   axios
  //     .get("/")
  //     .then((res) => {
  //       console.log("from 8282");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey={process.env.REACT_APP_KEY}
          token={makePayment}
          name="Buy react"
          amount={product.price * 100}
        >
          <button className="btn-large blue">Buy Now $ {product.price}</button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
