import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props) {
  const onClickFunction = () => {
    props.setOpenModal(previousState=>!previousState);
    /* no sabia que exista el prevState . */
  };
  
  return (
    <button
      className="CreateTodoButton"
      onClick={() => onClickFunction(props)}
    >
      +
    </button>
  );
}

export { CreateTodoButton };
