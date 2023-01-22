package entity

import (
	"time"

	"gorm.io/gorm"
)

type Gender_T struct{
	gorm.Model
	GenderName	string
	Technician	[]Technician	`gorm:"foreignKey:GENDER_ID"`
}

type Educate struct{
	gorm.Model
	CareerName	string
	Technician	[]Technician	`gorm:"foreignKey:EDUCATE_ID"`
}

type Prefix_T	struct{
	gorm.Model
	PrefixName	string
	Technician	[]Technician	`gorm:"foreignKey:PREFIX_ID"`
}

type Technician struct {
	gorm.Model
	Name        string
	ID_card		string
	DOB			time.Time		
	Phone		*uint

	GENDER_ID	*uint
	GENER		Gender_T	`gorm:"references:id"`

	EDUCATE_ID	*uint
	EDUCATE		Educate	`gorm:"references:id"`

	PREFIX_ID	*uint
	PREFIX		Prefix_T	`gorm:"references:id"`

	Location	string
	Email		string `gorm:"uniqueIndex"`
	Password	string	`json:"-"`
}