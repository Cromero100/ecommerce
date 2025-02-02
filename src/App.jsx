import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { MainLayout } from "./components/layout/MainLayout";
import { ProductList } from "./pages/ProductList";
import { Profile } from "./pages/Profile";
import { Cart } from "./pages/Cart";
import { Respuesta } from "./pages/Respuesta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/productos/" element={<ProductList />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/carrito/" element={<Cart />} />
          <Route path="/respuesta/" element={<Respuesta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
