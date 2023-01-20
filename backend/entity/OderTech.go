package entity

import (
	"time"

	"gorm.io/gorm"
)

type Type struct {
	gorm.Model
	TypeName  string
	OrderTech []OrderTech `gorm:"ForeignKey:TypeID"`
}

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
	Reason  string
	Solving string
	TimeOut time.Time

	StatusID *uint
	Status   Status

	DamageID *uint
	Damage   Damage

	CostDetailID *uint
	CostDetail   CostDetail
}
