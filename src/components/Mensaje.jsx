import propTypes from "prop-types";

const Mensaje = ({ children, tipo }) => {
  return <div className={`alerta ${tipo}`}>{children}</div>;
};

Mensaje.propTypes = {
  children: propTypes.node.isRequired,
  tipo: propTypes.string.isRequired,
};
export default Mensaje;
