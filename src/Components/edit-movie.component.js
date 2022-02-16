// EditMovie Component for update Movie data

// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieForm from "./MovieForm";

// EditMovie Component
const EditMovie = (props) => {
const [formValues, setFormValues] = useState({
	name: "",
	email: "",
	rollno: "",
});
	
//onSubmit handler
const onSubmit = (MovieObject) => {
	axios
	.put(
		"http://localhost:4000/Movies/update-Movie/" +
		props.match.params.id,
		MovieObject
	)
	.then((res) => {
		if (res.status === 200) {
		alert("Movie successfully updated");
		props.history.push("/Movie-list");
		} else Promise.reject();
	})
	.catch((err) => alert("Something went wrong"));
};

// Load data from server and reinitialize Movie form
useEffect(() => {
	axios
	.get(
		"http://localhost:4000/Movies/update-Movie/"
		+ props.match.params.id
	)
	.then((res) => {
		const { name, email, rollno } = res.data;
		setFormValues({ name, email, rollno });
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
