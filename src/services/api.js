const getProducts = async () => {
  const url = "https://api.escuelajs.co/api/v1/products";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al obtener los productos");
  }
  const data = await res.json();
  return data;
};

const getOnlyProduct = async (id) => {
  const url = `https://api.escuelajs.co/api/v1/products/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Error al obtener el producto con ID ${id}`);
  }
  const data = await res.json();
  return data;
};
export default getProducts;
export { getOnlyProduct };
