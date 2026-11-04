// Próxima versión con SQL: mover este catálogo a una tabla productos y
// consultarlo desde una API del backend; guardar pedidos y sus productos en
// tablas pedidos/detalle_pedido. El frontend debe consumir esa API, nunca
// conectarse directamente a SQL ni guardar credenciales de base de datos.
const products = [
  {
    idProducto: 1,
    nombre: "Torta Frutilla",
    precio: 22990,
    imagen:
      "https://images.unsplash.com/photo-1464306076886-da185f6a9d05",
    descripcion: "Torta artesanal de frutilla",
    tipoEntrega: "A coordinar",
    tiempoPreparacion: "48 horas"
  },
  {
    idProducto: 2,
    nombre: "Torta Chocolate",
    precio: 24990,
    imagen:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    descripcion: "Chocolate premium",
    tipoEntrega: "A coordinar",
    tiempoPreparacion: "48 horas"
  },
  {
    idProducto: 3,
    nombre: "Cheesecake",
    precio: 19990,
    imagen:
      "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    descripcion: "Frutos rojos",
    tipoEntrega: "A coordinar",
    tiempoPreparacion: "48 horas"
  }
];

export default products;