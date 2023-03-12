import React, { useState } from "react";
import style from "./Detail.module.css";

const Detail = ({ detail, setDetail, showDetail, handleClose, updateToDo }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleChange = ({ target }) => setDetail({ ...detail, [target.name]: target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    await updateToDo(detail)
    closeModal()
  }

  const closeModal = () => {
    setDetail({ id: "", title: "", description: "", priority: 1, state: 1 })
    setIsEditing(false)
    handleClose()
  }

  return showDetail && (
    <>
      <div className={style.background} onClick={closeModal} />
      <div className={style.container}>
        <div className={style.buttons}>
          <button className={style.button} onClick={() => isEditing ? closeModal() : setIsEditing(true)}> {isEditing ? "Cancel" : "Edit"} </button>
          {
            isEditing && <button className={style.button} onClick={handleSubmit}> Update! </button>
          }
        </div>
        <form className={style.form} autoComplete="off">
          <div className={style.subcontainer}>
            <label htmlFor="title"> Title </label>
            <input className={style.input} name="title" onChange={handleChange} value={detail.title} readOnly={!isEditing} />
          </div>
          <div className={style.subcontainer}>
            <label htmlFor="description"> Description </label>
            <textarea className={style.input} name="description" onChange={handleChange} value={detail.description} rows="10" cols="45" readOnly={!isEditing} />
          </div>
          <div className={style.subcontainer}>
            <label htmlFor="priority"> Priority </label>
            <select className={style.select} name="priority" onChange={handleChange} value={detail.priority} disabled={!isEditing}>
              {
                [...Array(10)].map((_, i) => <option key={i} value={i + 1}> {i + 1} </option>)
              }
            </select>
          </div>
          <div className={style.subcontainer}>
            <label htmlFor="state"> State </label>
            <select className={style.select} name="state" onChange={handleChange} value={detail.state} disabled={!isEditing}>
              <option value={1}> New </option>
              <option value={2}> Doing </option>
              <option value={3}> Done </option>
            </select>
          </div>
        </form>
      </div>
    </>
  )
}

export default Detail