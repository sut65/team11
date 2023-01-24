package entity

import (
	"time"

	"gorm.io/gorm"
)

type CostDetail struct {
	gorm.Model
	Cost      int
	OrderTech []OrderTech `gorm:"ForeignKey:CostDetailID"`
}
type Damage struct {
	gorm.Model
	DamageName string
	OrderTech  []OrderTech `gorm:"ForeignKey:DamageID"`
}

type Status struct {
	gorm.Model
	StatusName string
	OrderTech  []OrderTech `gorm:"ForeignKey:StatusID"`
}

type OrderTech struct {
	gorm.Model

	Solving string
	TimeOut time.Time

	StatusID *uint
	Status   Status `gorm:"references:id"`

	DamageID *uint
	Damage   Damage `gorm:"references:id"`

	CostDetailID *uint
	CostDetail   CostDetail `gorm:"references:id"`

	OrderID *uint
	ORDER   ORDER `gorm:"references:id"`

	TechnicianID *uint
	Technician   Technician `gorm:"references:id"`

	PayTech []PayTech `gorm:"foreignKey:OrderTechID"`
}
