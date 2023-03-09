import React, { useState } from "react";
import { MdAdd } from "react-icons/md";
import style from "./NewToDo.module.css";


const NewToDo = ({ createToDo }) => {
    const [isCreating, setIsCreating] = useState(false)
    const [input, setInput] = useState({ title: "", description: "", priority: 1 })

    const handleChange = ({ target }) => setInput({ ...input, [target.name]: target.value })

    const handleSubmit = async event => {
        event.preventDefault()
        await createToDo(input)
        setIsCreating(false)
        setInput({ title: "", description: "", priority: 1 })
    }

    return (
        <div className={style.container}>
            {
                !isCreating
                    ? <div className={style.plus} onClick={() => setIsCreating(true)}> <MdAdd size={96} /> </div>
                    : <form onSubmit={handleSubmit} className={style.form} autoComplete="off">
                        <input name="title" className={style.input} onChange={handleChange} />
                        <textarea name="description" className={style.input} onChange={handleChange} rows="5" />
                        <select onChange={handleChange} name="priority">
                            {
                                [...Array(10)].map((_, i) => <option key={i} value={i + 1}> {i + 1} </option>)
                            }
                        </select>
                        <input type="submit" value="Create" />
                    </form>
            }
        </div>
    )
}

export default NewToDo  