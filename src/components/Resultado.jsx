import { Form } from "react-bootstrap";

const Resultado = ({resultado}) => {
  return (
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
            <strong>Población:</strong> {resultado.population.toLocaleString()}
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
  );
};

export default Resultado;
