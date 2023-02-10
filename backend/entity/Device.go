package entity

import (
	"time"
	"unicode"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Type struct {
	gorm.Model
	Type_Name string
	Device    []Device `gorm:"ForeignKey:TypeID"`
}

type Windows struct {
	gorm.Model
	Windows_Name string
	Device       []Device `gorm:"ForeignKey:WindowsID"`
}

type Device struct {
	gorm.Model
	CPU      string `valid:"required~กรุณากรอกข้อมูล CPU,isAlpha~กรอกข้อมูล CPU ไม่ถูกต้อง"`
	Monitor  string `valid:"required~กรุณากรอกข้อมูล Monitor,isAlpha~กรอกข้อมูล Monitor ไม่ถูกต้อง"`
	GPU      string
	RAM      string
	Harddisk string
	Problem  string

	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	TypeID *uint
	Type   Type `gorm:"references:id" valid:"-"`

	WindowsID *uint
	Windows   Windows `gorm:"references:id" valid:"-"`

	Save_Time time.Time

	ORDER []ORDER `gorm:"ForeignKey:DeviceID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("isAlpha", func(i interface{}, _ interface{}) bool {
		field, ok := i.(string)
		if !ok {
			return false
		}

		for _, char := range field {
			if !unicode.IsLetter(char) && !unicode.IsNumber(char) && !unicode.IsSpace(char) {
				return false
			}
		}
		return true
	})
}
