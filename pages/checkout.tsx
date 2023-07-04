import { NextPage } from "next";
import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import Layout from "../components/Layout";
import axios from "axios";
import getStripe from "../utils/get-stripejs";
import Form from "../components/Form";

const CheckoutPage: NextPage = () => {
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState(null);

  const handleOnProcess = async () => {
    const { data } = await axios.post("/api/payment_intents", { amount });
    const { client_secret } = data;

    setClientSecret(client_secret);
  };

  return (
    <Layout title="Checkout">
      <div>
        <h2>Checkout</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
        <button onClick={handleOnProcess}>process</button>
        {clientSecret && (
          <Elements
            stripe={getStripe()}
            options={{
              clientSecret,
            }}
          >
            <Form />
          </Elements>
        )}
      </div>
    </Layout>
  );
};

export default CheckoutPage;
