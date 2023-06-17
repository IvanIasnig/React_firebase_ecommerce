import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { BsTrashFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Bg from "../components/Bg";
import { BsCartCheck } from 'react-icons/bs'
import "../css/products.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <>
      <Bg></Bg>
      <Navbar />
      <div className="container mt-5">
        <Link to="/checkout">
          <button className="btn btn-success mb-3"> <BsCartCheck className="me-2 mb-1"/>Check Out</button>
        </Link>
        {cart.length > 0 && (
          <div className="d-flex ">
            <h4 className="text-white">
              Totale: {Math.floor(calculateTotal())} €
            </h4>
          </div>
        )}
        <h1 className="text-white mb-3">Il tuo Carrello</h1>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      <small className="text-muted">{item.price} €</small>
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
            <p className="text-white">
              Il carrello è vuoto. Torna alla{" "}
              <Link to="/account">pagina dei prodotti</Link> per aggiungere
              articoli.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
