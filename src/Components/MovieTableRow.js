import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieTableRow = (props) => {
const { movie_id, title, fecha_de_creacion,  } = props.obj;

const deleteMovie =async () => {
		try {
		  const res = await axios.delete('http://localhost:3002/api/v1/movies/'+ movie_id);
		  console.log(res);
		  window.location.reload();
		} catch (error) {
		  console.error(error);
		}
	  };



return (
	<tr>
	<td>{title}</td>
	<td>{fecha_de_creacion}</td>
	<td>{movie_id}</td>

	<td>
		<Link className="edit-link"
		to={"/edit-Movie/" + movie_id}>
		Edit
		</Link>
		<Button onClick={deleteMovie}
		size="sm" variant="danger">
		Delete
		</Button>
	</td>
	</tr>
);
};

export default MovieTableRow;
