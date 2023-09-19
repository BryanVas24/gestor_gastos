import { useEffect, useState } from "react";
import btnCerrar from "../assets/images/cerrar.svg";
import propTypes from "prop-types";

import Mensaje from "./Mensaje";
const Modal = ({ animarmodal, AñadirGasto, GuardarGasto, gastoEdit }) => {
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [fecha, setFecha] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEdit).length > 0) {
      setNombre(gastoEdit.nombre);
      setCantidad(gastoEdit.cantidad);
      setCategoria(gastoEdit.categoria);
      setId(gastoEdit.id);
      setFecha(gastoEdit.fecha);
    }
  }, []);

  const validaModal = (e) => {
    e.preventDefault();

    if ([nombre, cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        setMensaje("");
      }, 3000);
      return;
    }
    GuardarGasto({ nombre, cantidad, categoria, id, fecha });
  };
  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={btnCerrar} alt="boton cerrar modal" onClick={AñadirGasto} />
      </div>
      <form
        onSubmit={validaModal}
        className={`formulario ${animarmodal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEdit.nombre ? "Editar gasto" : "Nuevo gasto"}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            placeholder="Ingresa el nombre de tu gasto"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            value={cantidad}
            placeholder="Ingresa la cantidad gastada"
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Tipo de gasto</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">---Seleciona---</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastosVarios">Gastos varios</option>
            <option value="salidas">Salidas</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEdit.nombre ? "Guardar cambios" : "Agregar gasto"}
        />
      </form>
    </div>
  );
};
Modal.propTypes = {
  AñadirGasto: propTypes.func.isRequired,
  animarmodal: propTypes.bool.isRequired,
  GuardarGasto: propTypes.func.isRequired,
  gastoEdit: propTypes.object.isRequired,
};

export default Modal;
