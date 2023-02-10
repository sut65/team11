package entity

import (
	"time"
	"unicode"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type State struct {
	gorm.Model
	State string
	ORDER []ORDER `gorm:"foreignKey:CASEID"`
}

type CASE struct {
	gorm.Model
	Case_text  string
	Level_case string
	ORDER      []ORDER `gorm:"foreignKey:CASEID"`
}

type ORDER struct {
	gorm.Model

	Date_time time.Time `valid:"NotPastAndNowOrderDateTime~กรุณาเลือกวันที่ให้ให้ช่างไปซ่อมให้ถูกต้อง"`
	Reason    string `valid:"required~กรุณากรอกเหตุผลเพิ่มเติม ถ้าไม่มีให้ขีด -,isAlpha~กรุณาไม่ใช้ตัวอีกษรพิเศษ"`
	Limits     int    `valid:"LimitIsNotNegativeNumbers~กรุณากรอกเลขให้ไม่ติดลบ,required~กรุณากรอกเลขให้ไม่มี 0"`

	CASEID uint
	CASE   CASE `gorm:"references:id" valid:"-"`

	StateID uint
	State   State `gorm:"references:id" valid:"-"`

	DeviceID uint
	Device   Device `gorm:"references:id" valid:"-"`

	AddressID uint
	Address   Address `gorm:"references:id" valid:"-"`

	CustomerID uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	OrderTech []OrderTech `gorm:"ForeignKey:OrderID"`

	Refund []Refund `gorm:"foreignKey:OrderID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("isAlpha", func(i interface{}, _ interface{}) bool {
		field, ok := i.(string)
		if !ok {
			return false
		}

		for _, char := range field {
			if !unicode.IsLetter(char) && !unicode.IsNumber(char) {
				return false
			}
		}
		return true
	})

	govalidator.CustomTypeTagMap.Set("LimitIsNotNegativeNumbers", func(i interface{}, _ interface{}) bool {
		n := i.(int)
		if n >= 0 {
			return true
		} else {
			return false
		}
	})

	govalidator.CustomTypeTagMap.Set("NotPastAndNowOrderDateTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.After(time.Now()) {
			return true

		} else {
			return false
		}
	})

}
