import React from "react";
import "./cartItem.css";
export const CartItem = ({
  item,
  onSelect,
  isSelected,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      <div className="item-select">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(item.id, e.target.checked)}
        />
      </div>
      <div className="item-image">
        <img src={item.images[1]} alt={item.title} />
      </div>
      <div className="item-details">
        <h3>{item.title}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))
            }
            className="quantity-btn"
          >
            -
          </button>
          <span className="quantity">{item.quantity || 1}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
            className="quantity-btn"
          >
            +
          </button>
        </div>
        <button onClick={() => onRemove(item.id)} className="remove-btn">
          Eliminar
        </button>
      </div>
    </div>
  );
};
