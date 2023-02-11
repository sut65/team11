package entity

import (
	"time"

	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	Name    string
	ID_card string
	DOB     time.Time
	Phone   string

	Email    string `gorm:"uniqueIndex"`
	Password string 

	ROLE_ID	*uint
	ROLE	Role	`gorm:"references:id"`

	//ส่ง คีย์ไปยัง Checked_payment
	Checked_payment []Checked_payment `gorm:"foreignKey:Admin_ID"`
}