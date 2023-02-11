package entity

import (
	"time"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type AddressType struct {
	gorm.Model
	Type_Name string

	Address []Address `gorm:"ForeignKey:AddressTypeID"`
}

type Province struct {
	gorm.Model
	Province_Name string

	District []District `gorm:"ForeignKey:ProvinceID"`
}

type District struct {
	gorm.Model
	District_Name string

	ProvinceID *uint
	Province   Province `gorm:"references:id"`

	Tambon []Tambon `gorm:"ForeignKey:DistrictID"`
}

type Tambon struct {
	gorm.Model
	Tambon_Name string

	DistrictID *uint
	District   District `gorm:"references:id"`

	Address []Address `gorm:"ForeignKey:TambonID"`
}

type Address struct {
	gorm.Model

	CustomerID *uint
	Customer   Customer `gorm:"references:id" valid:"-"`

	AddressTypeID *uint
	AddressType   AddressType `gorm:"references:id" valid:"-"`

	TambonID *uint
	Tambon   Tambon `gorm:"references:id" valid:"-"`

	Post_Code   int    `valid:"required~กรุณากรอกรหัสไปรษณีย์,PostCodeNotOver5Digit~กรุณากรอกรหัสไปรษณีย์ 5 หลัก"`
	Detail      string `valid:"required~กรุณากรอกรายละเอียดที่อยู่,maxstringlength(500)~รายละเอียดที่อยู่เกิน 500 ตัวอักษร"`
	Record_Time time.Time

	ORDER []ORDER `gorm:"ForeignKey:AddressID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("PostCodeNotOver5Digit", func(i interface{}, _ interface{}) bool {
		postCode, ok := i.(int)
		if !ok {
			return false
		}
		if postCode >= 100000 || postCode <= 9999 {
			return false
		}
		return true
	})
}
