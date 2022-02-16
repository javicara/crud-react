// CreateMovie Component for add new Movie

// Import Modules
import React, { useState } from "react";
import axios from 'axios';
import MovieForm from "./MovieForm";

// CreateMovie Component
const CreateMovie = () => {
const [formValues, setFormValues] =
	useState({ title: '', image: '', score: '',is_movie:'',fecha_de_creacion:''})
// onSubmit handler
const onSubmit = async MovieObject => {
	//console.log(MovieObject);
	try {
		const res = await axios.post('http://localhost:3002/api/v1/movies',MovieObject);
		console.log(res);
	  } catch (error) {
		console.error(error);
	  }
	}
	
// Return Movie form
return(
	<MovieForm initialValues={formValues}
	onSubmit={onSubmit}
	enableReinitialize>
	Create Movie
	</MovieForm>
)
}

// Export CreateMovie Component
export default CreateMovie
