package entity

import (
	"time"
	"github.com/asaskevich/govalidator"
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
	Date_time time.Time `valid:"required,CheckDateTime_Time_checkpayment~กรุณาตรวจสอบวันที่ให้ถูกต้อง"`
	Other     string	`valid:"maxstringlength(100)~แสดงความคิดเห็นได้ไม่เกิน 100 อักษร"`

	//ส่วนที่ดึงมาจากตาราง se	อื่น
	Status_ID    uint
	Status_check Status_check `gorm:"foreignkey:Status_ID" valid:"-"` //chat GPT บอกมา

	Payment_ID   uint
	Payment    Payment `gorm:"references:id" valid:"-"`

	CustomerID   uint
	Customer   Customer `gorm:"references:id" valid:"-"`
	Review     []Review `gorm:"foreignKey:CheckedPayment_ID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime_Time_checkpayment", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-2 * time.Minute)) || t.After(time.Now().Add(2 * time.Minute)) {
			return false

		} else {
			return true
		}
	})
}