import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { CartProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-7by7n8melcca38a0.us.auth0.com"
    clientId="GGlkxFu2idaVo0se37kcbF4BtaubmGSl"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <CartProvider>
      <App />
    </CartProvider>
  </Auth0Provider>
);
