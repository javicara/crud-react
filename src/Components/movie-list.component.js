import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MovieTableRow from "./MovieTableRow";

const MovieList = () => {
const [Movies, setMovies] = useState([]);

useEffect(() => {
	axios
	.get("http://localhost:3002/api/v1/movies")
	.then(({ data }) => {
		setMovies(data.data);
	})
	.catch((error) => {
		console.log(error);
	});
}, []);

const DataTable = () => {
	//console.log(Movies)
	return Movies.map((res, i) => {
	return <MovieTableRow obj={res} key={i} />;
	});
};

return (
	<div className="table-wrapper">
		<h2>LISTADO DE PELICULAS</h2>
	<Table striped bordered hover>
		<thead>
		<tr>
			<th>Name</th>
			<th>Fecha de Creacion</th>
			<th>ID</th>
			<th>Action</th>
		</tr>
		</thead>
		<tbody>{DataTable()}</tbody>
	</Table>
	</div>
);
};

export default MovieList;
