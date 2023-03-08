import React from "react";
import { todosAPI } from "../../apis/todosAPI";
import ToDo from "../todo/ToDo";
import style from "./ToDos.module.css";

const ToDos = ({ toDos, setToDos }) => {
    const deleteToDo = async id => {
        try {
            await todosAPI.deleteToDo(id)
            setToDos(toDos.filter(toDo => toDo.id !== id))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={style.container}>
            {
                toDos.length && toDos.map(({ id, title, description, priority, state }) => {
                    return (
                        <ToDo key={id} title={title} description={description} priority={priority} state={state} deleteToDo={() => deleteToDo(id)} />
                    )
                })
            }
        </div>
    )
}

export default ToDos