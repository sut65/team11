package entity

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name        string
	Email       string `gorm:"uniqueIndex"`
	Password    string `json:"-"`
	UserType_ID *uint
	UserType    UserType `gorm:"references:id"`
}

type UserType struct {
	gorm.Model
	UserType string `gorm:"foreignKey:PAYTECH_ID"`
	User     []User `gorm:"ForeignKey:UserType_ID"`
}
