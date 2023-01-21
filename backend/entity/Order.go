package entity

import (
	"time"

	"gorm.io/gorm"
)

type CASE struct {
	gorm.Model
	Case_text  string
	Level_case *uint
	ORDERS     []ORDER `gorm:"foreignKey:CASE_ID"`
}

type DEVICED struct {
	gorm.Model
	Status *uint

	DEVICE_ID *uint
	DEVICE    DEVICE `gorm:"references:id"`

	ORDERS []ORDER `gorm:"foreignKey:D_ID"`
}

type ADDRESSED struct {
	gorm.Model
	Status *uint

	ADDRESS_ID *uint
	ADDRESS    ADDRESS `gorm:"references:id"`

	ORDERS []ORDER `gorm:"foreignKey:A_ID"`
}

type ORDER struct {
	gorm.Model

	Date_time time.Time
	Reason    string
	Limit     int

	CASE_ID *uint
	CASE    CASE `gorm:"references:id"`

	ADDRESS_ID *uint
	ADDRESS    ADDRESS `gorm:"references:id"`

	CUSTOMER_ID *uint
	CUSTOMER    CUSTOMER `gorm:"references:id"`
}
