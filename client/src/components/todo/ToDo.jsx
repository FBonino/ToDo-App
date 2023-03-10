import React, { useState } from "react";
import style from "./ToDo.module.css";
import { MdDelete } from "react-icons/md";

const ToDo = ({ title, description, priority, state, deleteToDo, openDetail }) => {
    return (
        <div className={style.container} onClick={openDetail}>
            <div className={style.subcontainer}>
                <h3 className={style.text}> {title} </h3>
                <button className={style.delete} onClick={deleteToDo}> <MdDelete size={24} /> </button>
            </div>
            <p className={`${style.text} ${style.description}`}> {description} </p>
            <div className={style.info}>
                <p className={style.text}> Priority {priority}/10 </p>
                <p className={style.text}> State: {state} </p>
            </div>
        </div>
    )
}

export default ToDo