import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  , [cartItems]);


  const addItemToCart = (item, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity}
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItems = () => {
    console.log("cartItems getCartContext-->", cartItems);
    return cartItems;
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, increaseQuantity, decreaseQuantity, clearCart, getCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
