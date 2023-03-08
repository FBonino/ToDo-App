import React from "react";
import style from "./ToDo.module.css";
import { MdDelete } from "react-icons/md";

const ToDo = ({ title, description, priority, state, deleteToDo }) => {
    const states = {
        1: "New",
        2: "Doing",
        3: "Done",
    }

    return (
        <div className={style.container}>
            <div className={style.subcontainer}>
                <h2> {title} </h2>
                <button className={style.delete} onClick={deleteToDo}> <MdDelete size={32} /> </button>
            </div>
            <p> {description} </p>
            <p> Priority {priority}/10 </p>
            <p> State: {states[state]} </p>
        </div>
    )
}

export default ToDo