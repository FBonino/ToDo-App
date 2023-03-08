import React from "react";
import style from "./ToDo.module.css";

const ToDo = ({ title, description, priority, state }) => {
    const states = {
        1: "New",
        2: "Doing",
        3: "Done",
    }

    return (
        <div className={style.container}>
            <h2> {title} </h2>
            <p> {description} </p>
            <p> Priority {priority}/10 </p>
            <p> State: {states[state]} </p>
            <button>  </button>
        </div>
    )
}

export default ToDo