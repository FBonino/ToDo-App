import React, { useState } from "react";
import { todosAPI } from "../../apis/todosAPI";
import Detail from "../detail/Detail";
import NewToDo from "../new-todo/NewToDo";
import ToDo from "../todo/ToDo";
import style from "./ToDos.module.css";

const ToDos = ({ toDos, setToDos }) => {
	const [showDetail, setShowDetail] = useState(false)
	const [detail, setDetail] = useState({ id: "", title: "", description: "", priority: 1, state: 1 })

	const states = {
		1: "New",
		2: "Doing",
		3: "Done",
	}

	const createToDo = async input => {
		try {
			const newToDo = await todosAPI.createToDo(input)
			setToDos([...toDos, newToDo])
		} catch (err) {
			console.log(err)
		}
	}

	const updateToDo = async detail => {
		const { id, ...input } = detail
		try {
			const updatedToDo = await todosAPI.updateToDo(id, input)
			setToDos(toDos.map(toDo => toDo.id === id ? updatedToDo : toDo))
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

	const openDetail = (id, title, description, priority, state) => {
		setDetail({ id, title, description, priority, state })
		setShowDetail(true)
	}

	return (
		<div className={style.container}>
			{
				Object.keys(states).map(state => {
					return (
						<div className={style.column} key={state}>
							<p className={style.title}> {states[state]} </p>
							<div className={style.todos}>
								{
									toDos?.filter(todo => +state === todo.state).map(({ id, title, description, priority, state }) => {
										return (
											<ToDo
												key={id}
												title={title}
												description={description}
												priority={priority}
												state={states[state]}
												deleteToDo={() => deleteToDo(id)}
												openDetail={() => openDetail(id, title, description, priority, state)}
											/>
										)
									})
								}
								{
									states[state] === "New" && <NewToDo createToDo={createToDo} />
								}
							</div>
						</div>
					)
				})
			}
			<Detail detail={detail} setDetail={setDetail} showDetail={showDetail} handleClose={() => setShowDetail(false)} updateToDo={updateToDo} />
		</div>
	)
}

export default ToDos