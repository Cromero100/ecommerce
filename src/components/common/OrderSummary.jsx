import React from "react";
import "./orderSummary.css";
import handlePayment from "../../services/EpaycoCheckout";
export const OrderSummary = ({
  selectedItems,
  totalAmount,
  totalItems,
  cart,
}) => {
  const selectedProducts = cart.filter((item) => selectedItems.has(item.id));

  return (
    <div className="order-summary">
      <h2>Resumen de la orden</h2>
      <div className="summary-details">
        <p>
          Productos seleccionados: <span>{totalItems}</span>
        </p>
        <p className="total-amount">
          Total: <span>${totalAmount.toFixed(2)}</span>
        </p>
      </div>
      <button
        className="checkout-btn"
        disabled={totalItems === 0}
        onClick={() => handlePayment(selectedProducts)}
      >
        Continuar con la compra
      </button>
    </div>
  );
};
