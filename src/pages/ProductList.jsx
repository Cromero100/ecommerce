import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import getProducts from "../services/api";
import { ProductCard } from "../components/common/ProductCard";
import "./productList.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    searchQuery: "",
    sortBy: "default",
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products
  const getProductos = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      console.log("Productos ", products);
    } catch (error) {
      console.error("Error ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-50":
          result = result.filter((product) => product.price <= 50);
          break;
        case "51-100":
          result = result.filter(
            (product) => product.price > 50 && product.price <= 100
          );
          break;
        case "100+":
          result = result.filter((product) => product.price > 100);
          break;
      }
    }

    // Search query filter
    if (filters.searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredProducts(result);
  }, [filters, products]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="product-container">
      {/* Header */}
      <div className="product-header">
        <h1 className="product-title">Nuestros Productos</h1>
        <p className="product-subtitle">
          Encuentra los mejores productos para ti
        </p>
      </div>

      {/* Search and Filters */}
      <div className="search-filters-container">
        <div className="search-filters-wrapper">
          {/* Search bar */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar productos..."
              className="search-input"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
              }
            />
          </div>

          {/* Filter toggle button */}
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            Filtros
            <ChevronDown
              size={20}
              className={showFilters ? "filter-icon-rotate" : ""}
            />
          </button>

          {/* Sort dropdown */}
          <select
            className="sort-select"
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
            }
          >
            <option value="default">Ordenar por</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>

        {/* Extended filters */}
        {showFilters && (
          <div className="extended-filters">
            <div className="filter-group">
              <label className="filter-label">Categoría</label>
              <select
                className="filter-select"
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="all">Todas las categorías</option>
                <option value="ropa">Ropa</option>
                <option value="accesorios">Accesorios</option>
                <option value="calzado">Calzado</option>
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Rango de precio</label>
              <select
                className="filter-select"
                value={filters.priceRange}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    priceRange: e.target.value,
                  }))
                }
              >
                <option value="all">Todos los precios</option>
                <option value="0-50">$0 - $50</option>
                <option value="51-100">$51 - $100</option>
                <option value="100+">$100+</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="results-count">
        {filteredProducts.length} productos encontrados
      </div>

      {/* Products grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* No results message */}
      {filteredProducts.length === 0 && (
        <div className="no-results">
          <p className="no-results-text">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
          <button
            className="clear-filters-button"
            onClick={() =>
              setFilters({
                category: "all",
                priceRange: "all",
                searchQuery: "",
                sortBy: "default",
              })
            }
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
