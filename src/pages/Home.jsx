import React from "react";
import { useSpring, animated, config } from "react-spring";
import { useInView } from "react-intersection-observer";
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

  // Hero section animation
  const heroAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.molasses,
    delay: 300,
  });

  // Categories section animations
  const [categoriesRef, categoriesInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const categoriesAnimation = useSpring({
    opacity: categoriesInView ? 1 : 0,
    transform: categoriesInView ? "translateY(0)" : "translateY(50px)",
    config: config.gentle,
  });

  // Promo section animations
  const [promoRef, promoInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const promoAnimation = useSpring({
    opacity: promoInView ? 1 : 0,
    transform: promoInView ? "scale(1)" : "scale(0.8)",
    config: config.wobbly,
  });

  // Newsletter section animations
  const [newsletterRef, newsletterInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const newsletterAnimation = useSpring({
    opacity: newsletterInView ? 1 : 0,
    transform: newsletterInView ? "translateY(0)" : "translateY(50px)",
    config: config.gentle,
  });

  return (
    <>
      {/* Hero Section */}
      <animated.section className="hero-section" style={heroAnimation}>
        <div className="hero-content">
          <h1 className="hero-title">Descubre tu estilo único</h1>
          <p className="hero-subtitle">
            Encuentra las últimas tendencias en moda y accesorios
          </p>
          <Link to={"/productos"} className="hero-button hover-effect">
            Explorar Colección
          </Link>
        </div>
      </animated.section>

      {/* Categories Section */}
      <animated.section
        ref={categoriesRef}
        className="categories-section"
        style={categoriesAnimation}
      >
        <h2 className="section-title">Categorías Destacadas</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <animated.div
              key={category.id}
              className="category-card"
              style={useSpring({
                from: { opacity: 0, transform: "scale(0.8)" },
                to: { opacity: 1, transform: "scale(1)" },
                delay: index * 200,
              })}
            >
              <img
                src={category.image}
                alt={category.name}
                className="scale-effect"
              />
              <div className="category-overlay">{category.name}</div>
            </animated.div>
          ))}
        </div>
      </animated.section>

      {/* Promotional Banner */}
      <animated.section
        ref={promoRef}
        className="promotional-banner"
        style={promoAnimation}
      >
        <div className="promo-content">
          {[
            {
              icon: "🚚",
              title: "Envío Gratis",
              desc: "En pedidos superiores a $50",
            },
            {
              icon: "↩️",
              title: "Devolución Gratuita",
              desc: "30 días para cambios o devoluciones",
            },
            {
              icon: "🔒",
              title: "Pago Seguro",
              desc: "100% protección de compra",
            },
          ].map((item, index) => (
            <animated.div
              key={index}
              className="promo-item"
              style={useSpring({
                from: { opacity: 0, transform: "translateY(30px)" },
                to: { opacity: 1, transform: "translateY(0)" },
                delay: index * 200,
              })}
            >
              <div className="promo-icon">{item.icon}</div>
              <h3 className="promo-title">{item.title}</h3>
              <p className="promo-description">{item.desc}</p>
            </animated.div>
          ))}
        </div>
      </animated.section>

      {/* Newsletter Section */}
      <animated.section
        ref={newsletterRef}
        className="newsletter-section"
        style={newsletterAnimation}
      >
        <div className="newsletter-content">
          <h2 className="section-title">Suscríbete a nuestro newsletter</h2>
          <p>Recibe las últimas novedades y ofertas exclusivas</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button hover-effect">
              Suscribirse
            </button>
          </form>
        </div>
      </animated.section>
    </>
  );
};

export default Home;
