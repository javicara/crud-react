import React, { useState, useEffect } from "react";
import "./Films.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import Moment from "moment";
const axios = require("axios");
function Films(props) {
  const [formValues, setFormValues] = useState({
    title: "",
    image: "",
    score: "",
    is_movie: "",
    gender_id: "",
    fecha_de_creacion: "",
  });

  const [genres, setGenres] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);

    try {
      let response = await axios.post(
        "http://localhost:3002/api/v1/movies",
        formValues
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
        let fecha = Moment(value).format('MM/DD/YYYY') 
        console.log(fecha);
        setFormValues((prevState) => ({
            ...prevState,
            [name]: fecha,
          }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    getGenres();
  }, []);

  async function getGenres() {
    try {
      let response = await axios.get("http://localhost:3002/api/v1/genders");
      response = response.data.data;
      let genresAux = [];
      response.map((g) => {
        genresAux.push(g);
      });
      setGenres(genresAux);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <br></br>
      <h1> Formulario para cargar peliculas </h1>
      <br></br>
      <Form className="formulario">
        <Row>
          <Col>
            <Form.Control
              placeholder="Titulo de la pelicula"
              name="title"
              onChange={handleChange}
            />
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <Form.Control
              placeholder="Fecha"
              type="date"
              name="fecha_de_creacion"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="image"
              name="image"
              onChange={handleChange}
            />
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            <Form.Control
              placeholder="score 1-10"
              type="number"
              name="score"
              onChange={handleChange}
            />
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              className="selectGenre"
              name="gender_id"
              onChange={handleChange}
            >
              {/* Aca iria un map que me muestre las opciones de genero */}

              {genres.map((option) => (
                <option
                  key={option.gender_id}
                  value={option.gender_id}
                  name="gender_id"
                >
                  {option.name}
                </option>
              ))}
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
                onChange={handleChange}
              />
              <br></br>
              <Form.Check
                inline
                type="radio"
                label="Serie"
                name="is_movie"
                value="false"
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <Button
              variant="primary"
              size="lg"
              block="block"
              onClick={onSubmit}
            >
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
