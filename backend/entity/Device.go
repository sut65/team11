package entity

import (
	"time"

	"gorm.io/gorm"
)

type Type struct {
	gorm.Model
	Type_Name			string
	Device []Device `gorm:"ForeignKey:TypeID"`
}

type Windows struct {
	gorm.Model
	Windows_Name		string
	Device []Device `gorm:"ForeignKey:WindowsID"`
}


type Device struct {
	gorm.Model
	CPU					string
	Monitor				string
	GPU					string
	RAM					string
	Harddisk			string
	Problem				string

	CustomerID			*uint
	Customer            Customer `gorm:"references:id"`

	TypeID			*uint
	Type            Type `gorm:"references:id"`

	WindowsID			*uint
	Windows            Windows `gorm:"references:id"`

	DEVICED []DEVICED `gorm:"foreignKey:Device_ID"`

	Save_Time			time.Time
}