import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const localTem = localStorage.getItem("cartData");
  const addToCart = (product) => {
    const updateCard = [...cart, product];
    localStorage.setItem("cartData", JSON.stringify(updateCard));
    setCart(updateCard);
  };
  const removeFromCart = (productId) => {
    const updateCard = cart.filter((product) => product.id !== productId);
    localStorage.setItem("cartData", JSON.stringify(updateCard));
    setCart(updateCard);
  };

  const clearCart = () => {
    localStorage.removeItem("cartData");
    setCart([]);
  };
  useEffect(() => {
    if (localTem) setCart(JSON.parse(localTem));
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
