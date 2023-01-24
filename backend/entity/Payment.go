package entity

import (
	"time"

	"gorm.io/gorm"
)

type Bank struct {
	gorm.Model
	Bank_name string `gorm:"uniqueIndex"`
	// ธนาคาร 1 ธนาคาร ลูกค้าสามารถใช้ได้หลายคน
	Payment []Payment `gorm:"foreignKey:Bank_ID"`
}

type Payment struct {
	gorm.Model
	Sender_Name  string
	Amount       float32
	Amount_Check float32
	Date_time    time.Time
	Status_ID    *uint

	//ส่วนที่ดึงมาจากตารางอื่น
	PayTech_ID *uint
	PayTech    PayTech `gorm:"references:id"`
	Bank_ID    *uint
	Bank       Bank `gorm:"references:id"`

	CustomerID *uint
	Customer   Customer `gorm:"references:id"`

	//ส่ง คีย์ไปยัง Checked_payment
	Checked_payment []Checked_payment `gorm:"foreignKey:Payment_ID"`
}
