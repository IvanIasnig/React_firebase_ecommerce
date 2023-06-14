import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === product.id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      product.quantity = 1;
      newCart.push(product);
    }
    setCart(newCart);
  };

  const removeFromCart = (id) => {
    let newCart = [...cart];
    let itemInCart = newCart.find((item) => item.id === id);
    if (itemInCart.quantity > 1) {
      itemInCart.quantity--;
    } else {
      newCart = newCart.filter((item) => item.id !== id);
    }
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
