package db

import (
	"context"
	"fmt"
	"log"
	"server/configs"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var CTX context.Context = context.TODO()

func ConnectDB() *mongo.Client {
	config, err := configs.LoadConfig(".")

	if err != nil {
		log.Fatal("Could not load environment variables", err)
	}

	mongoconn := options.Client().ApplyURI(config.DB)
	mongoclient, err := mongo.Connect(CTX, mongoconn)

	if err != nil {
		panic(err)
	}

	if err := mongoclient.Ping(CTX, readpref.Primary()); err != nil {
		panic(err)
	}

	fmt.Println("MongoDB successfully connected...")

	return mongoclient
}

var MongoClient *mongo.Client = ConnectDB()

var DB *mongo.Database = MongoClient.Database("todo-app")

func GetCollection(collectionName string) *mongo.Collection {
	return DB.Collection(collectionName)
}
