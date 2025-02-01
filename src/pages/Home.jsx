import React from "react";
import { ProductList } from "./ProductList";
import "./home.css";
import { Link } from "react-router";

export const Home = () => {
  const categories = [
    { id: 1, name: "Ropa", image: "url-to-image" },
    { id: 2, name: "Accesorios", image: "url-to-image" },
    { id: 3, name: "Calzado", image: "url-to-image" },
    { id: 4, name: "Deportes", image: "url-to-image" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Descubre tu estilo único</h1>
          <p className="hero-subtitle">
            Encuentra las últimas tendencias en moda y accesorios
          </p>
          <Link to={"/productos"} className="hero-button">
            Explorar Colección
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Categorías Destacadas</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-overlay">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promotional-banner">
        <div className="promo-content">
          <div className="promo-item">
            <div className="promo-icon">🚚</div>
            <h3 className="promo-title">Envío Gratis</h3>
            <p className="promo-description">En pedidos superiores a $50</p>
          </div>
          <div className="promo-item">
            <div className="promo-icon">↩️</div>
            <h3 className="promo-title">Devolución Gratuita</h3>
            <p className="promo-description">
              30 días para cambios o devoluciones
            </p>
          </div>
          <div className="promo-item">
            <div className="promo-icon">🔒</div>
            <h3 className="promo-title">Pago Seguro</h3>
            <p className="promo-description">100% protección de compra</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2 className="section-title">Suscríbete a nuestro newsletter</h2>
          <p>Recibe las últimas novedades y ofertas exclusivas</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
