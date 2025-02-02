import React, { useContext, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { CartItem } from "../components/common/CartItem";
import { OrderSummary } from "../components/common/OrderSummary";
export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState(new Set());

  useEffect(() => {
    setSelectedItems(new Set());
  }, [cart]);
  const handleSelect = (itemId, isSelected) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  };
  const calculateTotals = () => {
    return cart.reduce(
      (acc, item) => {
        if (selectedItems.has(item.id)) {
          return {
            amount: acc.amount + item.price * (item.quantity || 1),
            items: acc.items + 1,
          };
        }
        return acc;
      },
      { amount: 0, items: 0 }
    );
  };

  const { amount: totalAmount, items: totalItems } = calculateTotals();

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h1>Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p className="empty-cart">Tu carrito está vacío</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id)}
              onSelect={handleSelect}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))
        )}
      </div>
      <OrderSummary
        selectedItems={selectedItems}
        totalAmount={totalAmount}
        totalItems={totalItems}
        cart={cart}
      />
    </div>
  );
};
