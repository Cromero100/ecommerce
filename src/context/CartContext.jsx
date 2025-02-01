/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificar si el producto ya existe en el carrito
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Si existe, incrementar la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // Si no existe, añadirlo con cantidad 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const clearCart = () => {
    setCart([]);
  };
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
