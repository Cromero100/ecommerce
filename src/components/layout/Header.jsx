import React, { useEffect } from "react";
import "./header.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom"; // Cambiar a react-router-dom
import { useCart } from "../../context/CartContext";
export const Header = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  const navigate = useNavigate();
  const { cart } = useCart();

  useEffect(() => {
    console.log("cris ");
  }); // Este useEffect parece innecesario, podrías eliminarlo si no lo usas.

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          MyStore
        </a>

        <div className="search-bar">
          <input type="text" placeholder="Buscar productos..." />
          <button className="search-button">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        <nav className="nav-menu">
          <a href="/categorias" className="nav-link">
            Categorías
          </a>
          <a href="/ofertas" className="nav-link">
            Ofertas
          </a>
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                onClick={() => {
                  console.log("Usuario ", user);
                }}
                className="nav-link"
              >
                Mi Cuenta
              </Link>
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="nav-link"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button onClick={() => loginWithRedirect()} className="nav-link">
              Iniciar sesión
            </button>
          )}
          <Link to="/carrito" className="nav-link cart-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <span className="cart-count">{cart.length}</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
