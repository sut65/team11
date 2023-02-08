package entity

import (
	"time"

	"gorm.io/gorm"
)

type GenderT struct {
	gorm.Model
	GenderName string
	Technician []Technician `gorm:"foreignKey:GENDER_ID"`
}

type Educate struct {
	gorm.Model
	EducateName string
	Technician  []Technician `gorm:"foreignKey:EDUCATE_ID"`
}

type PrefixT struct {
	gorm.Model
	PrefixName string
	Technician []Technician `gorm:"foreignKey:PREFIX_ID"`
}

type Technician struct {
	gorm.Model
	Name    string
	ID_card string
	DOB     time.Time
	Phone   string

	GENDER_ID *uint
	GENDER    GenderT `gorm:"references:id"`

	EDUCATE_ID *uint
	EDUCATE    Educate `gorm:"references:id"`

	PREFIX_ID *uint
	PREFIX    PrefixT `gorm:"references:id"`

	Location string
	Username string `gorm:"uniqueIndex"`
	Password string 

	ROLE_ID	*uint
	ROLE	Role	`gorm:"references:id"`

	OrderTech []OrderTech `gorm:"foreignKey:TechnicianID"`
	PayTech   []PayTech   `gorm:"foreignKey:TechnicianID"`
}
