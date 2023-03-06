package models

import "time"

type ToDo struct {
	ID          string    `json:"id" bson:"_id"`
	Title       string    `json:"title" bson:"title"`
	Description string    `json:"description" bson:"description"`
	Priority    uint8     `json:"priority" bson:"priority"`
	State       uint8     `json:"state" bson:"state"`
	Done        bool      `json:"done" bson:"done"`
	CreatedAt   time.Time `json:"created_at" bson:"created_at"`
	UpdatedAt   time.Time `json:"updated_at" bson:"updated_at"`
}

type ToDoCreate struct {
	Title       string `json:"title" bson:"title" binding:"required"`
	Description string `json:"description" bson:"description" binding:"required"`
	Priority    uint8  `json:"priority" bson:"priority" binding:"required"`
}

type ToDoUpdate struct {
	Title       string `json:"title,omitempty" bson:"title"`
	Description string `json:"description,omitempty" bson:"description"`
	Priority    uint8  `json:"priority,omitempty" bson:"priority"`
	State       uint8  `json:"state,omitempty" bson:"state"`
	Done        bool   `json:"done,omitempty" bson:"done"`
}
