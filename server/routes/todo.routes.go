package routes

import (
	"server/controllers"

	"github.com/gin-gonic/gin"
)

func ToDoRoutes(rg *gin.RouterGroup) {
	router := rg.Group("/todo")

	router.POST("", controllers.ToDoCreate)
	router.PUT("/:id", controllers.ToDoUpdate)
	router.DELETE("/:id", controllers.ToDoDelete)
	router.GET("/all", controllers.ToDoGetAll)
}
