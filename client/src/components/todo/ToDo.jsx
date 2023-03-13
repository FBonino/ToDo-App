import React, { useState } from "react";
import style from "./ToDo.module.css";
import { MdDelete } from "react-icons/md";

const ToDo = ({ title, description, priority, state, deleteToDo, openDetail }) => {
    return (
        <div className={style.container}>
            <button className={style.delete} onClick={deleteToDo}> <MdDelete size={24} /> </button>
            <div className={style.subcontainer} onClick={openDetail}>
                <h3 className={`${style.text} ${style.title}`}> {title} </h3>
                <p className={`${style.text} ${style.description}`}> {description} </p>
                <div className={style.info}>
                    <p className={style.text}> Priority {priority}/10 </p>
                    <p className={style.text}> State: {state} </p>
                </div>
            </div>
        </div>
    )
}

export default ToDo