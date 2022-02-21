import React, { useEffect, useState } from "react";
import "./List.css";
import { Form } from "react-bootstrap";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Moment from "moment";

const axios = require("axios");

function List() {
  const [films, setFilms] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [genres, setGenres] = useState([]);

  const [selectedFilm, setSelectedFilm] = useState({
    movie_id: "",
    title: "",
    image: "",
    fecha_de_creacion: "",
    score: "",
    is_movie: undefined,
    gender_id: "",
    characters: "",
  });

  const selectFilm = (elemento, modal) => {
    // console.log(elemento, modal)
    getFilmDetails(elemento.movie_id);
    modal === "Editar" && setModalEditar(true);
    modal === "Eliminar" && setModalEliminar(true);
  };

  useEffect(() => {
    getFilms();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('name: ',name, ' value: ',typeof(value));
    
    if (name === "is_movie") {
      let boolValue = (value == "true");
      console.log(typeof(boolValue))
      setSelectedFilm((prevState) => ({
        ...prevState,
        [name]: boolValue,
      }));
      
    } else if (name === "date") {
      let fecha = Moment(value).format("MM/DD/YYYY");
      console.log(fecha);
      setSelectedFilm((prevState) => ({
        ...prevState,
        [name]: fecha,
      }));
    } else {
      setSelectedFilm((prevState) => ({
        ...prevState,
        [name]: value,
        
      }));
    }
   
  };

  const eliminar = async () => {
    try {
      let response = await axios.delete(
        "http://localhost:3002/api/v1/movies/" + selectedFilm.movie_id
      );
      console.log(response);
      //vUELVO A ACTUALIZAR EL ESTADO DE LAS PELICULAS, QUIZAS SE PODRIA HACER SIN VOLVER A LLAMAR A LA API PERO VA BIEN
      getFilms();
      setModalEliminar(false);
      //response = response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const editar =async () => {
    
    try {
      let response = await axios.put(
        "http://localhost:3002/api/v1/movies/" + selectedFilm.movie_id,selectedFilm
      );
      console.log(response);
      //vUELVO A ACTUALIZAR EL ESTADO DE LAS PELICULAS, QUIZAS SE PODRIA HACER SIN VOLVER A LLAMAR A LA API PERO VA BIEN
      getFilms();
      setModalEditar(false);
      //response = response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  
  async function getFilms() {
    try {
      let response = await axios.get("http://localhost:3002/api/v1/movies");
      response = response.data.data;

      let dataAux = [];
      response.forEach((film) => {
        dataAux.push(film);
      });
      setFilms(dataAux);
      //console.log('aca',films);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFilmDetails(id) {
    try {
      let response = await axios.get(
        "http://localhost:3002/api/v1/movies/" + id
      );
      response = response.data.data;

      console.log("con detalle(genero y characters)", response);
      setSelectedFilm(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Listado de peliculas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>

            <th>Fecha de Creacion</th>

            <th>Imagen</th>

            <th>ID</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.movie_id}>
              <td>{film.title}</td>
              <td>{film.fecha_de_creacion}</td>
              <td>{film.image}</td>
              <td>{film.movie_id}</td>
              <td>
                {" "}
                <button
                  className="btn btn-primary"
                  onClick={() => selectFilm(film, "Editar")}
                >
                  Editar{" "}
                </button>
                {" - "}{" "}
                <button
                  className="btn btn-danger"
                  onClick={() => selectFilm(film, "Eliminar")}
                >
                  Eliminar{" "}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Pelicula</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              readOnly
              className="form-control"
              type="text"
              name="movie_id"
              value={selectedFilm && selectedFilm.movie_id}
            />
            <br />

            <label>Titulo</label>
            <input
              className="form-control"
              placeholder="Titulo de la pelicula"
              type="text"
              name="title"
              value={selectedFilm && selectedFilm.title}
              onChange={handleChange}
            />
            <br />
            <label>Imagen</label>
            <input
              className="form-control"
              type="text"
              name="image"
              value={selectedFilm && selectedFilm.image}
              onChange={handleChange}
            />
            <br />

            <label>Fecha de Creacion</label>
            <input
              className="form-control"
              type="date"
              name="fecha_de_creacion"
              value={selectedFilm && selectedFilm.fecha_de_creacion}
              onChange={handleChange}
            />
            <br />
            <label>Genero</label>
            <Form.Select
              aria-label="Default select example"
              className="selectGenre"
              name="gender_id"
              onChange={handleChange}
              value={selectedFilm.gender_id}
            >
              {/* Aca iria un map que me muestre las opciones de genero */}

              {genres.map((option) => (
                <option
                  onChange={handleChange}
                  key={option.gender_id}
                  value={option.gender_id}
                  name="gender_id"
                >
                  {option.name}
                </option>
              ))}
            </Form.Select>
            <div key={"inline-radio"} className="radios">
              <Form.Check
                inline
                type="radio"
                label="Pelicula"
                name="is_movie"
                value="true"
                checked={selectedFilm.is_movie === true}
                onChange={handleChange}
              />
              <br></br>
              <Form.Check
                inline
                type="radio"
                label="Serie"
                name="is_movie"
                value="false"
                checked={selectedFilm.is_movie=== false}
                onChange={handleChange}
              />

              
            </div>
      

            <label>Score</label>
            <input
              className="form-control"
              type="number"
              name="score"
              value={selectedFilm && selectedFilm.score}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => editar()}>
            Actualizar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>
      {
        <Modal isOpen={modalEliminar}>
          <ModalBody>
            Estás Seguro que deseas eliminar la pelicula {selectedFilm.title}{" "}
            {selectedFilm.title && selectedFilm.movie_id}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => eliminar()}>
              Sí
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setModalEliminar(false)}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
        /* 
      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar País</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>ID</label>
            <input
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={data[data.length - 1].id + 1}
            />
            <br />

            <label>País</label>
            <input
              className="form-control"
              type="text"
              name="nombre"
              value={paisSeleccionado ? paisSeleccionado.nombre : ""}
              onChange={handleChange}
            />
            <br />

            <label>Minutos</label>
            <input
              className="form-control"
              type="text"
              name="minutos"
              value={paisSeleccionado ? paisSeleccionado.minutos : ""}
              onChange={handleChange}
            />
            <br />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => insertar()}>
            Insertar
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter> 
      </Modal>*/
      }
    </div>
  );
}
export { List };
