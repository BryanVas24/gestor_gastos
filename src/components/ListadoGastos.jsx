import propTypes from "prop-types";
import Gasto from "./Gasto";
const ListadoGastos = ({
  gastos,
  setGastoEdit,
  DeleteGaso,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      {filtro ? (
        <>
          <h2>
            {gastosFiltrados.length
              ? "Gastos Filtrados"
              : "No hay gastos con esa categoria"}
          </h2>
          {gastosFiltrados.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEdit={setGastoEdit}
              DeleteGaso={DeleteGaso}
            />
          ))}
        </>
      ) : (
        <>
          <h2>{gastos.length ? "Gastos" : "Aun no Hay gastos"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              setGastoEdit={setGastoEdit}
              DeleteGaso={DeleteGaso}
            />
          ))}
        </>
      )}
    </div>
  );
};
ListadoGastos.propTypes = {
  gastos: propTypes.arrayOf(propTypes.object).isRequired,
  setGastoEdit: propTypes.func.isRequired,
  DeleteGaso: propTypes.func.isRequired,
  gastosFiltrados: propTypes.array.isRequired,
  filtro: propTypes.string.isRequired,
};

export default ListadoGastos;
