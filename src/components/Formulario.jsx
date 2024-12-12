import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Resultado from "./Resultado.jsx";
import Historial from "./Historial.jsx";

const Formulario = () => {
  //! VARIABLES DECLARADAS ==========================================
  const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);

  //! FUNCIONES            ==========================================
  useEffect(() => {
    const traerDatos = async () => {
      if (!buscar) return;
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${buscar}`
      );
      if (response.ok) {
        const data = await response.json();
        setResultado(data[0]);
        setHistorial((prev) => {
            const nuevoHistorial = [
                buscar.trim(),
                ...prev.filter(item => item !== buscar.trim()),
              ];
          return nuevoHistorial.slice(0, 5);
        });
      } else {
        setResultado(null);
        alert("País no encontrado");
        console.error("Error al obtener datos del país:");
      }
    }
    traerDatos();
  }, [buscar]);

  //! MAQUETADO            ==========================================
  return (
    <section className=" border border-1 p-5">
      <Form>
        <Form.Group className="mb-3" controlId="input buscar">
          <Form.Label>Buscar País</Form.Label>
          <Form.Control
            type="text"
            placeholder="Escriba el nombre de un país"
            minLength={3}
            maxLength={25}
            onChange={(e) => setBuscar(e.target.value)}
            value={buscar}
            required
          />
        </Form.Group>
        <Resultado resultado={resultado}></Resultado>
        <Historial historial={historial}></Historial>
      </Form>
    </section>
  );
};

export default Formulario;
