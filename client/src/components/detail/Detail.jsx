import React from "react";
import style from "./Detail.module.css";

const Detail = ({ detail, setDetail, showDetail, handleClose, updateToDo }) => {

  const handleChange = ({ target }) => setDetail({ ...detail, [target.name]: target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    await updateToDo(detail)
    setDetail({ id: "", title: "", description: "", priority: 1, state: 1 })
    handleClose()
  }

  return showDetail && (
    <>
      <div className={style.background} onClick={handleClose} />
      <form onSubmit={handleSubmit} className={style.container}>
        <div className={style.subcontainer}>
          <label htmlFor="title"> Title </label>
          <input name="title" onChange={handleChange} value={detail.title} />
        </div>
        <div className={style.subcontainer}>
          <label htmlFor="description"> Description </label>
          <textarea name="description" onChange={handleChange} value={detail.description} rows="10" cols="45" />
        </div>
        <div className={style.subcontainer}>
          <label htmlFor="priority"> Priority </label>
          <select name="priority" onChange={handleChange} value={detail.priority}>
            {
              [...Array(10)].map((_, i) => <option key={i} value={i + 1}> {i + 1} </option>)
            }
          </select>
        </div>
        <div className={style.subcontainer}>
          <label htmlFor="state"> State </label>
          <select name="state" onChange={handleChange} value={detail.state}>
            <option value={1}> New </option>
            <option value={2}> Doing </option>
            <option value={3}> Done </option>
          </select>
        </div>
        <input type="submit" value="Update!" />
      </form>
    </>
  )
}

export default Detail