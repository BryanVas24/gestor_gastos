import NuevoPresupuesto from "./NuevoPresupuesto";
import propTypes from "prop-types";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
  gastos,
  presupuesto,
  setPresupuesto,
  setValidpresupuesto,
  validpresupuesto,
  setGastos,
}) => {
  return (
    <header>
      {validpresupuesto ? (
        <>
          <h1>Tus estadisticas</h1>
          <ControlPresupuesto
            setGastos={setGastos}
            gastos={gastos}
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setValidpresupuesto={setValidpresupuesto}
          />
        </>
      ) : (
        <>
          <h1>Gestor de gastos</h1>
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setValidpresupuesto={setValidpresupuesto}
          />
        </>
      )}
    </header>
  );
};
Header.propTypes = {
  presupuesto: propTypes.number.isRequired,
  setPresupuesto: propTypes.func.isRequired,
  setValidpresupuesto: propTypes.func.isRequired,
  validpresupuesto: propTypes.bool.isRequired,
  gastos: propTypes.array.isRequired,
  setGastos: propTypes.func.isRequired,
};

export default Header;
