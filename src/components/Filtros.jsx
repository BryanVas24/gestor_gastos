import propTypes from "prop-types";

const Filtros = ({ filtro, setFiltro }) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filtrar gastos</label>
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">---Todas las categorias---</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastosVarios">Gastos varios</option>
            <option value="salidas">Salidas</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
      </form>
    </div>
  );
};
Filtros.propTypes = {
  filtro: propTypes.string.isRequired,
  setFiltro: propTypes.func.isRequired,
};

export default Filtros;
