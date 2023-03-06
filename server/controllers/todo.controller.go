package controllers

import (
	"net/http"
	"server/models"
	"server/services"

	"github.com/gin-gonic/gin"
)

func ToDoCreate(ctx *gin.Context) {
	var newToDo *models.ToDo

	var input *models.ToDoCreate

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	newToDo, err := services.ToDoCreate(input)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "ToDo": newToDo})
}

func ToDoUpdate(ctx *gin.Context) {
	var id string = ctx.Param("id")

	var input *models.ToDoUpdate

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	updatedToDo, err := services.ToDoUpdate(id, input)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "ToDo": updatedToDo})
}

func ToDoDelete(ctx *gin.Context) {
	var id string = ctx.Param("id")

	deletedToDo, err := services.ToDoDelete(id)

	if err != nil {
		ctx.JSON(http.StatusBadGateway, gin.H{"status": "error", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"status": "success", "ToDo": deletedToDo})
}

func ToDoGetAll(ctx *gin.Context) {
	toDos, err := services.ToDoGetAll()

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"status": "fail", "message": err.Error()})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{"status": "success", "ToDos": toDos})
}
