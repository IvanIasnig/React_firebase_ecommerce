import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Navbar from "../components/Navbar";

function CheckOut() {
  return (
    <>
    <Navbar></Navbar>
    <div className="container mt-5">
      <h2 className="text-center">Checkout</h2>
      <p className="text-center mt-3">Purtroppo non ho nulla da vendere se non la mia simpatia :D</p>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <h5 className="card-title">Dettagli Ordine</h5>
              <p className="card-text">Totale: 1.00 €</p>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "Add-3oHqqCTNNME2d0_apqGaifBvJVtMVjjNLqq1lWEed1Gi_ixL9NU9Hw0S39sIY0qNusdmSTqH_yL2",
                }}
              >
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "1.00",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then(function (details) {
                      alert(
                        "Transaction completed by " +
                          details.payer.name.given_name
                      );
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default CheckOut;
