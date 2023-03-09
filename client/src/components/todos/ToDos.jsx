import React from "react";
import { todosAPI } from "../../apis/todosAPI";
import NewToDo from "../new-todo/NewToDo";
import ToDo from "../todo/ToDo";
import style from "./ToDos.module.css";

const ToDos = ({ toDos, setToDos }) => {
    const createToDo = async input => {
        try {
            const newToDo = await todosAPI.createToDo(input)
            setToDos([...toDos, newToDo])
        } catch (err) {
            console.log(err)
        }
    }

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
            <NewToDo createToDo={createToDo} />
        </div>
    )
}

export default ToDos