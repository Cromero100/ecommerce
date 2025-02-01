import React, { useEffect, useState } from "react";
import getProducts from "../services/api";
import { ProductCard } from "../components/common/ProductCard";
import { Link } from "react-router";

export const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const getProductos = async () => {
    try {
      const products = await getProducts();
      setProductos(products);
      console.log("Productso ", productos);
    } catch (error) {
      console.error("Error ", error);
    }
  };
  useEffect(() => {
    getProductos();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {productos.map((producto) => (
          <>
            <ProductCard key={producto.id} product={producto} />
          </>
        ))}
      </div>
    </>
  );
};
