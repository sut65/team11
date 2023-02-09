package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name    string
	ID_card string
	DOB     time.Time
	Phone   string

	Email    string `gorm:"uniqueIndex"`
	Password string 

	ROLE_ID	*uint
	ROLE	Role	`gorm:"references:id"`

}