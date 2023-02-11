package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Hardware struct {
	gorm.Model
	HardwareName string

	PayTech []PayTech `gorm:"foreignKey:HardwareID"`
}

type PayTech struct {
	gorm.Model

	Note         string `valid:"maxstringlength(200)~กรอกได้สูงสุด 200 ตัวอักษร,matches([A-Za-zก-ฮ./()])~Solving must be A-Z a-z ก-ฮ ./(),required~Please enter a Note."`
	Amount       int    `valid:"LimitIsNotNegativeNumbers~จำนวนไม่สามารถติดลบได้,required~กรุณากรอกตัวเลขจำนวนมากกว่า 0"`
	CostHardware int    `valid:"LimitIsNotNegativeNumbers~ราคาไม่สามารถติดลบได้,required~กรุณากรอกตัวเลขราคามากกว่า 0"`

	HardwareID *uint    `valid:"-"`
	Hardware   Hardware `gorm:"references:id" valid:"-"`

	TechnicianID *uint      `valid:"-"`
	Technician   Technician `gorm:"references:id" valid:"-"`

	OrderTechID *uint     `valid:"-"`
	OrderTech   OrderTech `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("LimitIsNotNegativeNumbers", func(i interface{}, _ interface{}) bool {
		n := i.(int)
		if n >= 0 {
			return true
		} else {
			return false
		}
	})
}
