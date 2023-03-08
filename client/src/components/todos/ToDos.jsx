import React, { useEffect, useState } from "react";
import { todosAPI } from "../../apis/todosAPI";
import Loader from "../loader/Loader";
import ToDo from "../todo/ToDo";
import style from "./ToDos.module.css";

const ToDos = () => {
    const [toDos, setToDos] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        todosAPI.getToDos()
            .then(data => setToDos(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className={style.container}>
            {
                isLoading
                    ? <Loader />
                    : toDos.map(({ id, title, description, priority, state }) => <ToDo key={id} title={title} description={description} priority={priority} state={state} />)
            }
        </div>
    )
}

export default ToDos