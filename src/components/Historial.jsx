import { Form } from "react-bootstrap";

const Historial = ({historial}) => {
  return (
    <Form.Group className="mb-3" controlId="input historial">
      <Form.Label>Historial de Búsquedas</Form.Label>
      <Form.Control
        type="text"
        placeholder="No hay busquedas recientes"
        disabled
        value={
          historial.length ? historial.join(", ") : "No hay búsquedas recientes"
        }
      />
    </Form.Group>
  );
};

export default Historial;
