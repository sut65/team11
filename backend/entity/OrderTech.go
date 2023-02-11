package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type CostDetail struct {
	gorm.Model
	Cost      uint
	OrderTech []OrderTech `gorm:"foreignKey:CostDetailID"`
}
type Damage struct {
	gorm.Model
	DamageName string
	OrderTech  []OrderTech `gorm:"foreignKey:DamageID"`
}

type Status struct {
	gorm.Model
	StatusName string
	OrderTech  []OrderTech `gorm:"foreignKey:StatusID"`
}

type OrderTech struct {
	gorm.Model

	ForPaymentStatus bool //จั๊ดเป็นคนเพิ่ม ใช้ในระบบจั๊ด

	Solving string `valid:"maxstringlength(200)~กรอกได้สูงสุด 200 ตัวอักษร,matches([A-Za-zก-ฮ./()])~Solving must be A-Z a-z ก-ฮ ./(),required~Please enter a solving."`
	TimeOut time.Time `valid:"required~กรุณาใส่เวลาให้ถูกต้อง, DateTimeNotPast~เวลาห้ามเป็นอดีต"`

	StatusID *uint  `valid:"-"`
	Status   Status `gorm:"references:id" valid:"-"`

	DamageID *uint  `valid:"-"`
	Damage   Damage `gorm:"references:id" valid:"-"`

	CostDetailID *uint      `valid:"-"`
	CostDetail   CostDetail `gorm:"references:id" valid:"-"`

	OrderID *uint `valid:"-"`
	ORDER   ORDER `gorm:"references:id" valid:"-"`

	TechnicianID *uint      `valid:"-"`
	Technician   Technician `gorm:"references:id" valid:"-"`

	PayTech []PayTech `gorm:"foreignKey:OrderTechID"`
	Payment []Payment `gorm:"foreignKey:OrderTech_ID"`
}


func init() {
	govalidator.CustomTypeTagMap.Set("DateTimeNotPast", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-10 * time.Minute)) {
			return false

		} else {
			return true
		}
	})
}


