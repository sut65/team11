package entity

import (
	"time"

	"gorm.io/gorm"
)

type Hardware struct {
	gorm.Model
	HardwareName string
	Amount       int
	CostHardware int

	PayTech []PayTech `gorm:"ForeignKey:HardwareID"`
}

type PayTech struct {
	gorm.Model

	TimeStamp time.Time
	Note      string

	HardwareID *uint
	Hardware   Hardware `gorm:"references:id"`

	TypeID *uint
	Type   Type `gorm:"references:id"`

	TechnicianID *uint
	Technician   Technician `gorm:"references:id"`

	OrderID *uint
	ORDER   ORDER `gorm:"references:id"`

	Payments []Payment `gorm:"ForeignKey:PayTech_ID"`
}
