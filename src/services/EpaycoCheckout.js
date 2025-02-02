const handlePayment = (selectedProducts) => {
  if (!window.ePayco) {
    alert("El script de ePayco no se ha cargado correctamente.");
    return;
  }

  // Configurar la pasarela de pago
  const handler = window.ePayco.checkout.configure({
    key: "58adc3408c2a6e5d11a030aa6906be51", // Usa tu llave pública de ePayco
    test: true, // Cambia a false en producción
  });

  // Calcular totales
  const totalAmount = selectedProducts.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const taxBase = totalAmount * 0.84; // Asumiendo que el 84% del total es base imponible
  const tax = totalAmount * 0.16; // IVA del 16%

  // Datos de la transacción
  const data = {
    name: selectedProducts.map((item) => item.title).join(", "), // Nombres de productos
    description: selectedProducts.map((item) => item.title).join(" - "), // Descripción
    invoice: `FAC-${Math.floor(Math.random() * 1000000)}`, // Generar un número de factura aleatorio
    currency: "cop",
    amount: 5000.0,
    tax_base: taxBase.toFixed(2),
    tax: tax.toFixed(2),
    tax_ico: "0", // Si hay otros impuestos, agrégalos aquí
    country: "co",
    lang: "es",
    external: "true",
    confirmation: "http://localhost:8000/confirmacion", // URL backend
    response: "http://localhost:5173/respuesta",
    //Atributos cliente
    name_billing: "Jhon Doe",
    address_billing: "Carrera 19 numero 14 91",
    type_doc_billing: "cc",
    mobilephone_billing: "3050000000",
    number_doc_billing: "100000000",
    email_billing: "jhondoe@epayco.com", // URL frontend
  };
  console.log("datos de la compra ", data);

  // Abrir el checkout de ePayco
  handler.open(data);
};

export default handlePayment;
