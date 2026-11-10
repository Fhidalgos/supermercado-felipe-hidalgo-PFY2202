
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgregarProducto({ onAgregarProducto }) {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregar = (e) => {
    e.preventDefault();

    const precioNumero = Number(precio);
    const stockNumero = Number(stock);

    if (
      !nombre.trim() ||
      !categoria ||
      !Number.isInteger(precioNumero) ||
      precioNumero <= 0 ||
      !Number.isInteger(stockNumero) ||
      stockNumero < 0
    ) {
      alert("Ingrese datos válidos para el producto.");
      return;
    }

    const nuevoProducto = {
      nombre: nombre.trim(),
      categoria,
      precio: precioNumero,
      stock: stockNumero,
      descripcion: descripcion.trim()
    };

    onAgregarProducto(nuevoProducto);
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Agregar Producto
      </h1>

      <form
        onSubmit={agregar}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <div>
          <label className="block font-semibold mb-2">
            Nombre del producto
          </label>

          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Categoría
          </label>

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
            className="w-full border rounded-lg p-3 bg-white"
          >
            <option value="">Seleccione una categoría</option>
            <option value="Lácteos">Lácteos</option>
            <option value="Abarrotes">Abarrotes</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Limpieza">Limpieza</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Precio (CLP)
          </label>

          <input
            type="number"
            min="1"
            step="1"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Stock inicial
          </label>

          <input
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">
            Descripción
          </label>

          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border rounded-lg p-3"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Guardar Producto
        </button>
      </form>
    </div>
  );
}

export default AgregarProducto;
