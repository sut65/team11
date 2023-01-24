package entity

import (
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

	Note string

	HardwareID *uint
	Hardware   Hardware `gorm:"references:id"`

	TechnicianID *uint
	Technician   Technician `gorm:"references:id"`

	OrderTechID *uint
	OrderTech   OrderTech `gorm:"references:id"`

	Payments []Payment `gorm:"ForeignKey:PayTech_ID"`
}
