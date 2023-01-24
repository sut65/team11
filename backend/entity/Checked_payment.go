package entity

import (
	"time"

	"gorm.io/gorm"
)

type Status_check struct {
	gorm.Model
	Status_name string `gorm:"uniqueIndex"`
	// สถานะ 1 สถานะ เป็นได้หลาย รายการตรวจสอบการชำระเงิน
	//Checked_payment []Checked_payment `gorm:"foreignKey:Status_ID"`
}

type Checked_payment struct {
	gorm.Model
	Date_time time.Time
	Other     string

	//ส่วนที่ดึงมาจากตาราง se	อื่น
	Status_ID    *uint
	Status_check Status_check `gorm:"foreignkey:Status_ID"` //chat GPT บอกมา

	Payment_ID *uint
	Payment    Payment `gorm:"references:id"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`
}
