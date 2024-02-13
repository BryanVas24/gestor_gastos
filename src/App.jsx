import { useState, useEffect } from "react";
import Header from "./components/Header";
import NuevoGastoicon from "./assets/images/nuevo-gasto.svg";
import Modal from "./components/Modal";
import Filtros from "./components/Filtros";
import ListadoGastos from "./components/ListadoGastos";
import { IdGenerator } from "./helpers";

function App() {
  const [validpresupuesto, setValidpresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarmodal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEdit, setGastoEdit] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltrados, setGastosFiltrados] = useState([]);
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto") ?? 0)
  );

  const AñadirGasto = () => {
    setGastoEdit({});
    !modal
      ? setModal(true)
      : setTimeout(() => {
          setModal(false);
          setGastoEdit({});
        }, 500);
    setAnimarModal(false);
  };

  const GuardarGasto = (gasto) => {
    if (gasto.id) {
      const gastosActualizados = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(gastosActualizados);
      setGastoEdit({});
    } else {
      gasto.id = IdGenerator();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  useEffect(() => {
    if (Object.keys(gastoEdit).length > 0) {
      !modal
        ? setModal(true)
        : setTimeout(() => {
            setModal(false);
          }, 500);
      setAnimarModal(false);
    }
  }, [gastoEdit]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const PresupuestoLS = Number(localStorage.getItem("presupuesto"));
    if (PresupuestoLS > 0) {
      setValidpresupuesto(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro]);

  setTimeout(() => {
    setAnimarModal(true);
  }, 500);

  const DeleteGaso = (id) => {
    const gastosActualizados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosActualizados);
  };

  return (
    <div className={modal ? "fijar" : ""}>
      <header>
        <Header
          gastos={gastos}
          setGastos={setGastos}
          validpresupuesto={validpresupuesto}
          setValidpresupuesto={setValidpresupuesto}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
        />
      </header>
      {validpresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />

            <ListadoGastos
              DeleteGaso={DeleteGaso}
              gastos={gastos}
              setGastoEdit={setGastoEdit}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <section className="nuevo-gasto">
            <img
              src={NuevoGastoicon}
              alt="icono de nuevo gasto"
              onClick={AñadirGasto}
            />
          </section>
        </>
      )}
      {modal && (
        <Modal
          setAnimarModal={setAnimarModal}
          animarmodal={animarmodal}
          AñadirGasto={AñadirGasto}
          GuardarGasto={GuardarGasto}
          gastoEdit={gastoEdit}
          setGastoEdit={setGastoEdit}
        />
      )}
    </div>
  );
}

export default App;
