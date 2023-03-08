import React from "react";
import ToDos from "../../components/todos/ToDos";
import Filters from "../../components/filters/Filters";
import style from "./Home.module.css";

const Home = () => {

    return (
        <div className={style.container}>
            <Filters />
            <ToDos />
        </div>
    )
}

export default Home