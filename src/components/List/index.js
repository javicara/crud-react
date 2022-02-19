import React, { useEffect, useState } from "react";
import "./List.css";
import {Modal, ModalBody, ModalHeader,ModalFooter}from 'reactstrap'
import { convertToObject } from "typescript";

const axios = require("axios");



function List() {
  const [films, setFilms] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [selectedFilm, setSelectedFilm] = useState({
    movie_id:"",
    title:"",
    image:"",
    fecha_de_creacion:"",
    score:"",
    is_movie:"",
    gender_id:"",
    gender:"",
    characters:""
  });

  const selectFilm = (elemento, modal) => {
   // console.log(elemento, modal)
    getFilmDetails(elemento.movie_id)
    modal === "Editar" && setModalEditar(true);
    modal === "Eliminar" && setModalEliminar(true);
  };

  useEffect(() => {
    getFilms();
  }, []);
  

 const handleChange=()=>{
     //console.log(selectedFilm);
 }

 const editar=()=>{
     console.log('Actualizarrr')
 }
  async function getFilms() {
    try {
      let response = await axios.get("http://localhost:3002/api/v1/movies");
      response = response.data.data;

      let dataAux = [];
      response.map((film) => {
        dataAux.push(film);
      });
      setFilms(dataAux);
      console.log(films);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFilmDetails(id) {
    try {
      let response = await axios.get("http://localhost:3002/api/v1/movies/"+id);
      response = response.data.data;

      console.log(response);
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
                  onClick={() =>selectFilm(film, "Editar")}
                >
                  Editar {" "}
                </button>
                {" - "} <button className="btn btn-danger">Eliminar </button>
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
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={selectedFilm && selectedFilm.movie_id}
            />
            <br />

            <label>Titulo</label>
            <input
              className="form-control"
              type="text"
              name="titulo"
              value={selectedFilm && selectedFilm.title}
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
{/*  
      <Modal isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar el país{" "}
          {paisSeleccionado && paisSeleccionado.nombre}
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
      </Modal>*/}
    </div>
  );
}
export { List };
