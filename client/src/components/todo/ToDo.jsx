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
                <h3 className={style.text}> {title} </h3>
                <button className={style.delete} onClick={deleteToDo}> <MdDelete size={24} /> </button>
            </div>
            <p className={`${style.text} ${style.description}`}> {description} </p>
            <div className={style.info}>
                <p className={style.text}> Priority {priority}/10 </p>
                <p className={style.text}> State: {states[state]} </p>
            </div>
        </div>
    )
}

export default ToDo