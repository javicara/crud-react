// EditMovie Component for update Movie data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";

// EditMovie Component
const EditMovie = (props) => {
	const [formValues, setFormValues] =
	useState({ title: '', image: '', score: '',is_movie:'',fecha_de_creacion:''})
	
//onSubmit handler
const onSubmit = async(MovieObject) => {
	console.log('entra')
	try {
		const res = await axios.put("http://localhost:3002/api/v1/movies/" +
		props.match.params.id,MovieObject);
		alert("Movie successfully updated");
		props.history.push("/Movie-list");
		console.log(res);
	  } catch (error) {
		console.error(error);
	  }

};

// Load data from server and reinitialize Movie form
useEffect(() => {
	axios
	.get(
		"http://localhost:3002/api/v1/movies/"
		+ props.match.params.id
	)
	.then((res) => {
		console.log(res.data.data)
		const { title, image, score,is_movie,fecha_de_creacion } = res.data.data;
		setFormValues({ title, image, score,is_movie,fecha_de_creacion});
	})
	.catch((err) => console.log(err));
}, []);

// Return Movie form
return (
	<MovieForm
	initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize
	>
	Update Movie
	</MovieForm>
);
};

// Export EditMovie Component
export default EditMovie;
