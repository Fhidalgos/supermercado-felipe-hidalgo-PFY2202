
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function DetalleProducto({ productos, onAgregarAlCarrito }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cantidad, setCantidad] = useState(1);

  const producto = productos.find(
    (item) => item.id === Number(id)
  );

  if (!producto) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-red-600">
          Producto no encontrado
        </h2>

        <Link to="/" className="text-blue-700 underline">
          Volver al inventario
        </Link>
      </div>
    );
  }

  const agregarAlCarrito = () => {
    const cantidadNumero = Number(cantidad);

    if (
      !Number.isInteger(cantidadNumero) ||
      cantidadNumero < 1 ||
      cantidadNumero > producto.stock
    ) {
      alert("La cantidad ingresada no es válida.");
      return;
    }

    onAgregarAlCarrito(producto.id, cantidadNumero);
    navigate("/carrito");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Detalle del Producto
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          {producto.nombre}
        </h2>

        <div className="space-y-3 text-lg">
          <p>
            <strong>Categoría:</strong> {producto.categoria}
          </p>

          <p>
            <strong>Descripción:</strong>{" "}
            {producto.descripcion || "Sin descripción"}
          </p>

          <p>
            <strong>Precio:</strong> $
            {producto.precio.toLocaleString("es-CL")}
          </p>

          <p>
            <strong>Stock disponible:</strong> {producto.stock}
          </p>
        </div>

        <div className="mt-6">
          <label className="block font-semibold mb-2">
            Cantidad:
          </label>

          <input
            type="number"
            min="1"
            max={producto.stock}
            step="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            disabled={producto.stock === 0}
            className="border rounded-lg p-3 w-32"
          />
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={agregarAlCarrito}
            disabled={producto.stock === 0}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Agregar al Carrito
          </button>

          <Link
            to="/"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
          >
            Volver al Inventario
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
