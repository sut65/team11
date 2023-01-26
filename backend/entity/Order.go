package entity

import (
	"time"

	"gorm.io/gorm"
)

type State struct {
	gorm.Model
	State string
	ORDER []ORDER `gorm:"foreignKey:CASEID"`
}

type CASE struct {
	gorm.Model
	Case_text  string
	Level_case string
	ORDER      []ORDER `gorm:"foreignKey:CASEID"`
}

type ORDER struct {
	gorm.Model

	Date_time time.Time
	Reason    string
	Limit     int

	CASEID *uint
	CASE   CASE `gorm:"references:id"`

	StateID *uint
	State   State `gorm:"references:id"`

	DeviceID *uint
	Device   Device `gorm:"references:id"`

	AddressID *uint
	Address   Address `gorm:"references:id"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`

	OrderTech []OrderTech `gorm:"ForeignKey:OrderID"`
}
