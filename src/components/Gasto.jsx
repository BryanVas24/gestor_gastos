import propType from "prop-types";
import {
  SwipeableList,
  LeadingActions,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
import { DateFormater } from "../helpers/index";
import { FormatearDinero } from "../helpers/index";
import AhorroImage from "../assets/images/icono_ahorro.svg";
import CasaImage from "../assets/images/icono_casa.svg";
import ComidaImage from "../assets/images/icono_comida.svg";
import GastoImage from "../assets/images/icono_gastos.svg";
import OcioImage from "../assets/images/icono_ocio.svg";
import SaludImage from "../assets/images/icono_salud.svg";
import SuscripcionImage from "../assets/images/icono_suscripciones.svg";

const Gasto = ({ gasto, setGastoEdit, DeleteGaso }) => {
  const DiccionarioIconos = {
    ahorro: AhorroImage,
    comida: ComidaImage,
    casa: CasaImage,
    gastosVarios: GastoImage,
    salidas: OcioImage,
    salud: SaludImage,
    suscripciones: SuscripcionImage,
  };

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEdit(gasto)}>Editar</SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive={true} onClick={() => DeleteGaso(gasto.id)}>
        {" "}
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra manita">
          <div className="contenido-gasto">
            <img
              src={DiccionarioIconos[gasto.categoria]}
              alt="icono de gasto"
            />
            <div className="descripcion-gasto">
              <p className="categoria">{gasto.categoria}</p>
              <p className="nombre-gasto">{gasto.nombre}</p>
              <p className="descripcion-gasto">
                Agregado el: <span>{DateFormater(gasto.fecha)}</span>{" "}
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">
            {FormatearDinero(Number(gasto.cantidad))}
          </p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

Gasto.propTypes = {
  gasto: propType.object.isRequired,
  setGastoEdit: propType.func.isRequired,
  DeleteGaso: propType.func.isRequired,
};
export default Gasto;
