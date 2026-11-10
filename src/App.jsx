

import { useState } from "react";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Inventario from "./pages/Inventario";
import AgregarProducto from "./pages/AgregarProducto";
import DetalleProducto from "./pages/DetalleProducto";
import Carrito from "./pages/Carrito";

const productosIniciales = [
  {
    id: 1,
    nombre: "Leche Entera",
    categoria: "Lácteos",
    precio: 1290,
    stock: 20,
    descripcion: "Leche entera de 1 litro"
  },
  {
    id: 2,
    nombre: "Arroz",
    categoria: "Abarrotes",
    precio: 1590,
    stock: 30,
    descripcion: "Arroz grado 1 de 1 kilo"
  },
  {
    id: 3,
    nombre: "Bebida Coca-Cola",
    categoria: "Bebidas",
    precio: 2490,
    stock: 15,
    descripcion: "Bebida de 2 litros"
  },
  {
    id: 4,
    nombre: "Detergente",
    categoria: "Limpieza",
    precio: 3990,
    stock: 10,
    descripcion: "Detergente líquido de 1 litro"
  },
  {
    id: 5,
    nombre: "Yogur Natural",
    categoria: "Lácteos",
    precio: 690,
    stock: 25,
    descripcion: "Yogur natural individual"
  },
  {
    id: 6,
    nombre: "Fideos",
    categoria: "Abarrotes",
    precio: 990,
    stock: 40,
    descripcion: "Paquete de fideos de 400 gramos"
  }
];

function App() {
  const [estado, setEstado] = useState({
    productos: productosIniciales,
    carrito: []
  });

  const { productos, carrito } = estado;

  // Agregar nuevos productos al inventario
  const agregarProducto = (nuevoProducto) => {
    setEstado((anterior) => {
      const nuevoId =
        Math.max(0, ...anterior.productos.map((p) => p.id)) + 1;

      return {
        ...anterior,
        productos: [
          ...anterior.productos,
          { ...nuevoProducto, id: nuevoId }
        ]
      };
    });
  };

  // Agregar productos al carrito y descontar stock
  const agregarAlCarrito = (id, cantidad) => {
    setEstado((anterior) => {
      const producto = anterior.productos.find(
        (p) => p.id === id
      );

      if (
        !producto ||
        !Number.isInteger(cantidad) ||
        cantidad < 1 ||
        cantidad > producto.stock
      ) {
        return anterior;
      }

      const productosActualizados = anterior.productos.map(
        (p) =>
          p.id === id
            ? { ...p, stock: p.stock - cantidad }
            : p
      );

      const existe = anterior.carrito.find(
        (item) => item.id === id
      );

      const carritoActualizado = existe
        ? anterior.carrito.map((item) =>
            item.id === id
              ? { ...item, cantidad: item.cantidad + cantidad }
              : item
          )
        : [...anterior.carrito, { id, cantidad }];

      return {
        productos: productosActualizados,
        carrito: carritoActualizado
      };
    });
  };

  // Aumentar o disminuir productos del carrito
  const cambiarCantidadCarrito = (id, cambio) => {
    setEstado((anterior) => {
      const item = anterior.carrito.find(
        (elemento) => elemento.id === id
      );

      const producto = anterior.productos.find(
        (p) => p.id === id
      );

      if (!item || !producto || ![-1, 1].includes(cambio)) {
        return anterior;
      }

      if (cambio === 1 && producto.stock === 0) {
        return anterior;
      }

      const productosActualizados = anterior.productos.map(
        (p) =>
          p.id === id
            ? { ...p, stock: p.stock - cambio }
            : p
      );

      const carritoActualizado = anterior.carrito
        .map((elemento) =>
          elemento.id === id
            ? {
                ...elemento,
                cantidad: elemento.cantidad + cambio
              }
            : elemento
        )
        .filter((elemento) => elemento.cantidad > 0);

      return {
        productos: productosActualizados,
        carrito: carritoActualizado
      };
    });
  };

  // Calcular la cantidad total de artículos en el carrito
  const totalCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-800 text-white p-5">
          <nav className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
            <h1 className="text-2xl font-bold">
              Supermercado Felipe Hidalgo
            </h1>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Inventario
              </Link>

              <Link
                to="/agregar"
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Agregar Producto
              </Link>

              <Link
                to="/carrito"
                className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Carrito ({totalCarrito})
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Inventario productos={productos} />
              }
            />

            <Route
              path="/agregar"
              element={
                <AgregarProducto
                  onAgregarProducto={agregarProducto}
                />
              }
            />

            <Route
              path="/producto/:id"
              element={
                <DetalleProducto
                  productos={productos}
                  onAgregarAlCarrito={agregarAlCarrito}
                />
              }
            />

            <Route
              path="/carrito"
              element={
                <Carrito
                  productos={productos}
                  carrito={carrito}
                  onCambiarCantidad={cambiarCantidadCarrito}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
