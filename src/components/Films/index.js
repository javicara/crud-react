import React from "react";
import "./Films.css";
import { Form, Row, Col,Button } from "react-bootstrap";
function Films(props) {
    const [formValues, setFormValues] =
	React.useState({ title: '', image: '', score: '',is_movie:'',fecha_de_creacion:''})
   const  onSubmit = (e)=>{
        e.preventDefault();
        console.log(formValues)
    }

  return (
    <div>
      <br></br>
      <h1> Formulario para cargar peliculas </h1>
      <br></br>
      <Form className="formulario">
        <Row>
          <Col>
            <Form.Control placeholder="Titulo de la pelicula" />
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <Form.Control placeholder="Fecha" type="date" />
          </Col>
          <Col>
            <Form.Control placeholder="image" />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Control placeholder="score 1-10" type="number" />
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              className="selectGenre"
            >
              {/* Aca iria un map que me muestre las opciones de genero */}
              <option>Select the Genre</option>
              <option>Acción</option>
              <option>Drama</option>
              <option>HARDCODEADO</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col>
            <div key={"inline-radio"} className="radios">
              <Form.Check
                inline
                type="radio"
                label="Pelicula"
                name="is_movie"
                value="true"
              />
              <br></br>
              <Form.Check
                inline
                type="radio"
                label="serie"
                name="is_movie"
                value="false"
              />
            </div>
          </Col>
        </Row>
        <Row>
            <Col></Col>
         <Col> <Button variant="primary" size="lg" block="block"  onClick={onSubmit}>
           Crear Pelicula
          </Button>
          </Col>
            <Col></Col>

        </Row>
      </Form>
    </div>
  );
}

export { Films };
