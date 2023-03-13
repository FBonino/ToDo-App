import React, { useEffect, useState } from "react";
import ToDos from "../../components/todos/ToDos";
import style from "./Home.module.css";
import { todosAPI } from "../../apis/todosAPI";
import Loader from "../../components/loader/Loader";

const Home = () => {
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
            <div className={style.title}>
                <h2> ToDo App </h2>
            </div>
            {
                isLoading
                    ? <Loader />
                    : <ToDos toDos={toDos} setToDos={setToDos} />
            }
        </div>
    )
}

export default Home