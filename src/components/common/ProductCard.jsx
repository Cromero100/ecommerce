import React, { useContext, useState } from "react";
import "./productCard.css";

import { Link } from "react-router";
import { useCart } from "../../context/CartContext";

export const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart, cart } = useCart();
  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleAddCar = () => {
    addToCart(product);
    console.log("carr ", cart);
  };
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          src={product.images[currentImageIndex]}
          alt={product.title}
          className="product-image"
        />

        <div className="thumbnails">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`thumbnail-button ${
                currentImageIndex === index ? "active" : ""
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <Link style={{ textDecoration: "none" }} to={`/producto/${product.id}`}>
          <span className="product-category">{product.category.name}</span>

          <h3 className="product-title">{product.title}</h3>

          <div className="product-price">${product.price}</div>

          <p className="product-description">{product.description}</p>
        </Link>
        <button onClick={handleAddCar} className="add-to-cart-button">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};
