
import { useState } from "react";
import { Link } from "react-router-dom";

function Inventario({ productos = [] }) {
  const [categoria, setCategoria] = useState("Todas");

  const categorias = [
    "Todas",
    ...new Set(productos.map((producto) => producto.categoria))
  ];

  const productosFiltrados = productos.filter((producto) =>
    categoria === "Todas" || producto.categoria === categoria
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Inventario del Supermercado
      </h1>

      <div className="mb-6">
        <label className="block font-semibold mb-2">
          Filtrar por categoría:
        </label>

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border rounded-lg p-2 w-full md:w-64 bg-white"
        >
          {categorias.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white p-5 rounded-xl shadow-md border"
          >
            <h2 className="text-xl font-bold text-blue-700">
              {producto.nombre}
            </h2>

            <p className="mt-2">
              Categoría: {producto.categoria}
            </p>

            <p>
              Precio: ${producto.precio.toLocaleString("es-CL")}
            </p>

            <p>
              Stock disponible: {producto.stock}
            </p>

            <Link
              to={`/producto/${producto.id}`}
              className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Ver detalle
            </Link>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p className="text-gray-600 mt-6">
          No hay productos disponibles en esta categoría.
        </p>
      )}
    </div>
  );
}

export default Inventario;
