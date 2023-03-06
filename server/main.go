package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"server/configs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var (
	ctx         context.Context
	mongoclient *mongo.Client
)

func init() {
	ctx = context.TODO()
	config, err := configs.LoadConfig(".")

	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	mongoconn := options.Client().ApplyURI(config.DB)
	mongoclient, err := mongo.Connect(ctx, mongoconn)

	if err != nil {
		panic(err)
	}

	if err := mongoclient.Ping(ctx, readpref.Primary()); err != nil {
		panic(err)
	}

	fmt.Println("MongoDB successfully connected...")
}

func main() {
	defer mongoclient.Disconnect(ctx)

	server := gin.Default()

	config, _ := configs.LoadConfig(".")

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{config.Client}

	server.Use(cors.New(corsConfig))

	router := server.Group("/api")

	router.GET("/healthchecker", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "ok"})
	})

	log.Fatal(server.Run(":" + config.Port))
}
