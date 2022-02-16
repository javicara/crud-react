import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button } from "react-bootstrap";

const MovieForm = (props) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    score: Yup.number()
      .positive("Invalid score number")
      .integer("Invalid score number")
      .required("Required"),
    fecha_de_creacion: Yup.date().required("Required")
  });
  console.log(props);
  return (
    <div className="form-wrapper" >
      <Formik {...props} >
        <Form>
          Title:
          <FormGroup>
            <Field name="title" type="text" className="form-control" />
            <ErrorMessage
              name="title"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          Image:
          <FormGroup>
            <Field
              name="image"
              type="text"
              value="https://www.learningcontainer.com/wp-content/uploads/2020/08/Large-Sample-png-Image-download-for-Testing.png"
              className="form-control"
            />
            <ErrorMessage
              name="image"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          Score:
          <FormGroup>
            <Field name="score" type="number" className="form-control" />
            <ErrorMessage
              name="score"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          Fecha De Creacion
          <FormGroup>
            <Field
              name="fecha_de_creacion"
              type="date"
              className="form-control"
            />
            <ErrorMessage
              name="score"
              className="d-block invalid-feedback"
              component="span"
            />
          </FormGroup>
          Pelicula / Serie
          <FormGroup>
            <label>
              <Field type="radio" name="is_movie" value="true" />
              Pelicula
            </label>
            <br></br>
            <label>
              <Field type="radio" name="is_movie" value="fasle" />
              Serie
            </label>
          </FormGroup>
          
          <br></br>
          <Button variant="danger" size="lg" block="block" type="submit">
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default MovieForm;
