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
	Amount       *uint
	Amount_Check *uint
	Date_time    time.Time
	Status_ID    *uint
	Other        string

	//ส่วนที่ดึงมาจากตารางอื่น
	PAYTECH_ID *uint
	//	PAYTECH    PAYTECH `gorm:"references:id"`
	Bank_ID *uint
	Bank    Bank `gorm:"references:id"`
	User_ID *uint
	User    User `gorm:"references:id"`

	//ส่ง คีย์ไปยัง Checked_payment
	//	Checked_payment []Checked_payment `gorm:"foreignKey:Payment_ID"`
}
