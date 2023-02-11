package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
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
	Sender_Name  string  `valid:"required~ท่านกรอกรายชื่อไม่ถูกต้อง"`
	Amount       float32 `valid:"required~เหมือนคุณจะลืมใส่จำนวนเงินนะ ห้ามเป็น 0,IsNotNegativeNumbers~คุณใส่จำนวนเงินไม่ถูกต้อง"`
	Amount_Check float32
	Date_time    time.Time `valid:"required,NotFuture_payment~กรุณาตรวจสอบวันที่ให้ถูกต้อง"`
	Status_ID    uint

	//ส่วนที่ดึงมาจากตารางอื่น
	OrderTech_ID uint
	OrderTech    OrderTech `gorm:"references:id" valid:"-"`
	Bank_ID      uint
	Bank         Bank `gorm:"references:id" valid:"-"`

	CustomerID uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	//ส่ง คีย์ไปยัง Checked_payment
	Checked_payment []Checked_payment `gorm:"foreignKey:Payment_ID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("IsNotNegativeNumbers", func(i interface{}, _ interface{}) bool {
		n := i.(float32)
		if n >= 0 {
			return true
		} else {
			return false
		}
	})
	govalidator.CustomTypeTagMap.Set("NotFuture_payment", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.After(time.Now()) {
			return false

		} else {
			return true
		}
	})
}
