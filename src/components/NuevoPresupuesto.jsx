import propTypes from "prop-types";
import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setValidpresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");

  const verificacionPresupuesto = (e) => {
    e.preventDefault();
    if (!presupuesto || presupuesto < 1) {
      setMensaje("Ingresa un presupuesto valido");
      return;
    }
    setMensaje("");
    setValidpresupuesto(true);
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={verificacionPresupuesto} className="formulario">
        <div className="campo">
          <label htmlFor="presupuesto">INGRESA TU PRESUPUESTO</label>
          <input
            id="presupuesto"
            type="number"
            placeholder="Añade tu presupuesto"
            className="nuevo-presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
          />
          <input type="submit" value="Añadir" />
          {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </div>
      </form>
    </div>
  );
};
NuevoPresupuesto.propTypes = {
  presupuesto: propTypes.number.isRequired,
  setPresupuesto: propTypes.func.isRequired,
  setValidpresupuesto: propTypes.func.isRequired,
};

export default NuevoPresupuesto;
