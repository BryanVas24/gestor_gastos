import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { FormatearDinero } from "../helpers/index";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({
  presupuesto,
  gastos,
  setGastos,
  setPresupuesto,
  setValidpresupuesto,
}) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + Number(total),
      0
    );
    const restaDinero = presupuesto - totalGastado;

    const NewPresupuesto = (
      ((presupuesto - restaDinero) / presupuesto) *
      100
    ).toFixed(2);

    setDisponible(restaDinero);
    setGastado(totalGastado);
    setTimeout(() => setPorcentaje(NewPresupuesto), 1500);
  }, [gastos]);
  const ResetApp = () => {
    const resultado = confirm(
      "¿Seguro de que quieres reiniciar? (tu presupuesto y gastos volveran a cero)"
    );
    if (resultado) {
      setGastos([]);
      setPresupuesto(0);
      setValidpresupuesto(false);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <CircularProgressbar
        text={`${porcentaje}% usado`}
        styles={buildStyles({
          textColor:
            porcentaje <= 50 ? "green" : porcentaje <= 80 ? "orange" : "red",
          pathColor: porcentaje > 100 ? "red" : "#3882F6",
          trailColor: " #F5F5F5",
        })}
        value={porcentaje}
      />
      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={ResetApp}>
          Resetear App
        </button>
        <p>
          {" "}
          <span>Presupuesto: </span> {FormatearDinero(presupuesto)}
        </p>
        <p className={disponible < 0 ? "negativo" : ""}>
          {" "}
          <span>Disponible: </span> {FormatearDinero(disponible)}
        </p>
        <p>
          {" "}
          <span>Gastado: </span> {FormatearDinero(Number(gastado))}
        </p>
      </div>
    </div>
  );
};

ControlPresupuesto.propTypes = {
  presupuesto: propTypes.number.isRequired,
  gastos: propTypes.array.isRequired,
  setGastos: propTypes.func.isRequired,
  setPresupuesto: propTypes.func.isRequired,
  setValidpresupuesto: propTypes.func.isRequired,
};
export default ControlPresupuesto;
