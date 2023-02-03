package entity

import (
	"gorm.io/gorm"
	"time"
)

// TODO B6304577 ---> REVIEW
type Satisfaction_System struct {
	gorm.Model
	Satisfaction_System_Type string
	Reviews                  []Review `gorm:"ForeignKey:Satisfaction_System_ID"`
}

type Satisfaction_Technician struct {
	gorm.Model
	Satisfaction_Technician_Type string
	Reviews                      []Review `gorm:"ForeignKey:Satisfaction_Technician_ID"`
}

type Review struct {
	gorm.Model
	CheckedPayment_ID      uint
	Checked_payment        Checked_payment `gorm:"references:id"`
	Satisfaction_System_ID uint
	Satisfaction_System    Satisfaction_System `gorm:"references:id"`

	Review_Comment_System string

	Satisfaction_Technician_ID uint
	Satisfaction_Technician    Satisfaction_Technician `gorm:"references:id"`

	Review_Comment_Technician string
	TimestampReview           time.Time
	StatusReview              bool `valid:"required~!! โอ๊ะโอวววว เหมือนคุณจะลืมกด check box !!"`
	Customer_ID               uint
	Customer                  Customer `gorm:"references:id"`
	CheckSucceed              bool

	Claim_Order []Claim_Order `gorm:"ForeignKey:Review_ID"`
}
