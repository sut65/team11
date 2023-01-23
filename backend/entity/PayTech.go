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
	PayTech      []PayTech `gorm:"ForeignKey:HardwareID"`
}

type PayTech struct {
	gorm.Model

	HardwareID *uint
	Hardware   Hardware

	TimeStamp time.Time
	Note      string
	Payments  []Payment `gorm:"ForeignKey:PayTech_ID"`
}
