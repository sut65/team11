package entity

import (
	"time"

	"gorm.io/gorm"
)

type CASE struct {
	gorm.Model
	Case_text  string
	Level_case *uint
	ORDER      []ORDER `gorm:"foreignKey:CASE_ID"`
}

type DEVICED struct {
	gorm.Model
	Status *uint

	DEVICED_ID *uint
	DEVICED    Device `gorm:"references:id"`

	ORDER []ORDER `gorm:"foreignKey:D_ID"`
}

type ADDRESSED struct {
	gorm.Model
	Status *uint

	ADDRESS_ID *uint
	ADDRESS    Address `gorm:"references:id"`

	ORDER []ORDER `gorm:"foreignKey:A_ID"`
}

type ORDER struct {
	gorm.Model

	Date_time time.Time
	Reason    string
	Limit     int

	CASE_ID *uint
	CASE    CASE `gorm:"references:id"`

	DEVICE_ID *uint
	DEVICE    Device `gorm:"references:id"`

	ADDRESS_ID *uint
	ADDRESS    ADDRESSED `gorm:"references:id"`

	CUSTOMER_ID *uint
	CUSTOMER    Customer `gorm:"references:id"`
}
