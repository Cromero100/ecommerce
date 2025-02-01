import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOnlyProduct } from "../services/api";
import "./ProductDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const getProducto = async () => {
    try {
      console.log("id ", id);
      const producto = await getOnlyProduct(id);
      setProduct(producto);
      console.log("Producto ", product);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  useEffect(() => {
    getProducto();
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Agregando ${quantity} unidades al carrito`);
    // Aquí iría la lógica para agregar al carrito
  };

  const handleShare = (platform) => {
    // Aquí iría la lógica para compartir
    console.log(`Compartiendo en ${platform}`);
  };

  if (!product) {
    return <div className="product-detail-container">Cargando...</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">
        <div className="image-gallery">
          <img
            src={product.images[currentImage]}
            alt={product.title}
            className="main-image"
          />
          <div className="thumbnail-container">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} - vista ${index + 1}`}
                className={`thumbnail ${
                  currentImage === index ? "active" : ""
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <div className="category-label">{product.category.name}</div>
          <h1 className="product-title">{product.title}</h1>
          <div className="product-price">${product.price}</div>

          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          <div className="action-buttons">
            <button className="primary-button" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
            <button className="secondary-button">Comprar ahora</button>
          </div>

          <div className="additional-info">
            <h3>Compartir producto:</h3>
            <div className="social-share">
              <button
                className="share-button"
                onClick={() => handleShare("facebook")}
              >
                Facebook
              </button>
              <button
                className="share-button"
                onClick={() => handleShare("twitter")}
              >
                Twitter
              </button>
              <button
                className="share-button"
                onClick={() => handleShare("whatsapp")}
              >
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
