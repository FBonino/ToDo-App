package main

import (
	"log"
	"net/http"
	"server/configs"
	"server/db"
	"server/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	defer db.MongoClient.Disconnect(db.CTX)

	server := gin.Default()

	config, _ := configs.LoadConfig(".")

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{config.Client}

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")

	router.GET("/healthchecker", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "ok"})
	})

	// Routes
	routes.ToDoRoutes(router)

	log.Fatal(server.Run(":" + config.Port))
}
