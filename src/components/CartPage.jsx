import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { BsTrashFill } from "react-icons/bs";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.prezzo * item.quantity, 0);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Il tuo Carrello</h1>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.url} alt={item.title} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">
                      <small className="text-muted">{item.prezzo} €</small>
                    </p>
                    <p className="card-text">Quantità: {item.quantity}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <BsTrashFill /> Diminuisci quantità
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p>
              Il carrello è vuoto. Torna alla{" "}
              <Link to="/account">pagina dei prodotti</Link> per aggiungere
              articoli.
            </p>
          </div>
        )}
        {cart.length > 0 && (
          <div className="d-flex justify-content-end">
            <h4>Totale: {calculateTotal()} €</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
