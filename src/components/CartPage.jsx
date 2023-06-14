import React, { useContext } from 'react';
import { CartContext } from '../context/Cartcontext';
import { BsTrashFill } from 'react-icons/bs';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div className="container mt-5">
      <h2>Carrello</h2>
      {cart.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <button onClick={() => removeFromCart(item.id)}>
            <BsTrashFill /> Rimuovi
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
