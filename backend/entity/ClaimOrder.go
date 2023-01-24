package entity

import (
	"gorm.io/gorm"
	"time"
)

type Urgency struct {
	gorm.Model
	Urgency_Type string
	Claim_Orders []Claim_Order `gorm:"ForeignKey:Urgency_ID"`
}
type StatusClaim struct {
	gorm.Model
	Status_Type       string
	Claim_Orders []Claim_Order `gorm:"ForeignKey:StatusClaim_ID"`
}
type Claim_Order struct {
	gorm.Model

	Review_ID      *uint
	Review         Review `gorm:"references:id"`
	Urgency_ID     *uint
	Urgency        Urgency `gorm:"references:id"`
	ClaimTime      time.Time
	OrderProblem   string
	Claim_Comment  string
	StatusClaim_ID *uint
	StatusClaim    StatusClaim `gorm:"references:id"`
	// Customer_ID               *uint
	// Customer                  Customer `gorm:"references:id"`
}
