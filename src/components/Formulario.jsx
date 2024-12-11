import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Formulario = () => {
  //! VARIABLES DECLARADAS ==========================================
  const [buscar, setBuscar] = useState("");
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  //! FUNCIONES            ==========================================

  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${buscar}`
      );
      if (!response.ok) throw new Error("País no encontrado");
      const data = await response.json();
      setResultado(data[0]);
      setHistorial((prev) => {
        const nuevoHistorial = [
          buscar.trim(),
          ...prev.filter(
            (item) => item.toLowerCase() !== buscar.trim().toLowerCase()
          ),
        ];
        return nuevoHistorial.slice(0, 5);
      });
    } catch (error) {
      alert(error.message);
      setResultado(null);
    }
    setBuscar("");
  };

  //! MAQUETADO            ==========================================
  return (
    <section className=" border border-1 p-5">
      <Form onSubmit={handleBuscar}>
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

        <Form.Group className="mb-3" controlId="input resultado">
          <Form.Label>Resultado</Form.Label>
          {resultado ? (
            <div className="border p-3">
              <p>
                <strong>Nombre:</strong> {resultado.name.common}
              </p>
              <p>
                <strong>Capital:</strong> {resultado.capital}
              </p>
              <p>
                <strong>Población:</strong>{" "}
                {resultado.population.toLocaleString()}
              </p>
              <p>
                <strong>Bandera:</strong>{" "}
                <img src={resultado.flags.svg} style={{ width: "100px" }} />
              </p>
            </div>
          ) : (
            <Form.Control
              type="text"
              placeholder="No hay resultados para mostrar"
              disabled
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="input historial">
          <Form.Label>Historial de Búsquedas</Form.Label>
          <Form.Control
            type="text"
            placeholder="No hay busquedas recientes"
            disabled
            value={
              historial.length
                ? historial.join(", ")
                : "No hay búsquedas recientes"
            }
          />
        </Form.Group>
        <Button variant="info" type="submit">
          Buscar
        </Button>
      </Form>
    </section>
  );
};

export default Formulario;
