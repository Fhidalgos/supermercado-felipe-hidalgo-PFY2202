
import { Link } from "react-router-dom";

function Carrito({ productos, carrito, onCambiarCantidad }) {

  const articulosCarrito = carrito
    .map((item) => {
      const producto = productos.find(
        (p) => p.id === item.id
      );

      if (!producto) return null;

      return {
        ...producto,
        cantidad: item.cantidad
      };
    })
    .filter(Boolean);

  const total = articulosCarrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Carrito de Compras
      </h1>

      {articulosCarrito.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <p className="text-lg mb-4">
            Tu carrito está vacío.
          </p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Volver al Inventario
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {articulosCarrito.map((producto) => (
              <div
                key={producto.id}
                className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-blue-700">
                    {producto.nombre}
                  </h2>

                  <p>Categoría: {producto.categoria}</p>

                  <p>
                    Precio unitario: $
                    {producto.precio.toLocaleString("es-CL")}
                  </p>

                  <p>
                    Stock disponible: {producto.stock}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${producto.nombre}`}
                    onClick={() =>
                      onCambiarCantidad(producto.id, -1)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">
                    {producto.cantidad}
                  </span>

                  <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${producto.nombre}`}
                    onClick={() =>
                      onCambiarCantidad(producto.id, 1)
                    }
                    disabled={producto.stock === 0}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>

                <p className="text-lg font-bold">
                  Subtotal: $
                  {(producto.precio * producto.cantidad)
                    .toLocaleString("es-CL")}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md mt-6">
            <h2 className="text-2xl font-bold text-blue-800">
              Total: ${total.toLocaleString("es-CL")}
            </h2>

            <Link
              to="/"
              className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Seguir Comprando
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Carrito;
