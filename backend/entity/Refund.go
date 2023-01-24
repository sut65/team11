package entity

import (
	"time"

	"gorm.io/gorm"
)

type Cause struct {
	gorm.Model
	Cause_text string
	By_text    string
	Refund     []Refund `gorm:"foreignKey:CauseID"`
}

type Contact struct {
	gorm.Model
	Contact string
	Times   string
	Refund  []Refund `gorm:"foreignKey:ContactID"`
}

type Refund struct {
	gorm.Model
	Refund_Cause   string
	Refund_Contact string
	Refund_time    time.Time

	ReviewID *uint
	Review   Review `gorm:"references:id"`

	CauseID *uint
	Cause   Cause `gorm:"references:id"`

	ContactID *uint
	Contact   Contact `gorm:"references:id"`
}
