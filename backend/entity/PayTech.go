package entity

import (
	_ "time"

	"gorm.io/gorm"
)

type Hardware struct {
	gorm.Model
	HardwareName string
	Amount       int
	CostHardware int
}
