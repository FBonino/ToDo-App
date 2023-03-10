package services

import (
	"server/db"
	"server/models"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"nullprogram.com/x/uuid"
)

func ToDoCreate(input *models.ToDoCreate) (*models.ToDo, error) {
	now := time.Now()

	var toDo *models.ToDo

	var newToDo models.ToDo = models.ToDo{
		ID:          uuid.NewGen().NewV4().String(),
		Title:       input.Title,
		Description: input.Description,
		Priority:    input.Priority,
		State:       1,
		CreatedAt:   now,
		UpdatedAt:   now,
	}

	todosCollection := db.GetCollection("todos")

	res, err := todosCollection.InsertOne(db.CTX, &newToDo)

	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": res.InsertedID}

	err = todosCollection.FindOne(db.CTX, query).Decode(&toDo)

	if err != nil {
		return nil, err
	}

	return toDo, nil
}

func ToDoUpdate(id string, input *models.ToDoUpdate) (*models.ToDo, error) {
	var updatedToDo *models.ToDo

	todosCollection := db.GetCollection("todos")

	update := bson.M{
		"$set": bson.M{
			"title":       input.Title,
			"description": input.Description,
			"priority":    input.Priority,
			"state":       input.State,
			"updated_at":  time.Now(),
		},
	}

	_, err := todosCollection.UpdateByID(db.CTX, id, update)

	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": id}

	err = todosCollection.FindOne(db.CTX, query).Decode(&updatedToDo)

	if err != nil {
		return nil, err
	}

	return updatedToDo, err
}

func ToDoDelete(id string) (*mongo.DeleteResult, error) {
	todosCollection := db.GetCollection("todos")

	query := bson.M{"_id": id}

	res, err := todosCollection.DeleteOne(db.CTX, query)

	return res, err
}

func ToDoGetAll() ([]*models.ToDo, error) {
	var toDos []*models.ToDo

	todosCollection := db.GetCollection("todos")

	query := bson.M{}

	res, err := todosCollection.Find(db.CTX, query)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return []*models.ToDo{}, err
		}
		return nil, err
	}

	for res.Next(db.CTX) {
		var toDo *models.ToDo

		err := res.Decode(&toDo)

		if err == nil {
			toDos = append(toDos, toDo)
		}
	}

	return toDos, nil
}
