package entity

import (
	"time"

	"gorm.io/gorm"
)

type GenderT struct {
	gorm.Model
	GenderName string
	Technician []Technician `gorm:"foreignKey:GENDER_ID"`
}

type Educate struct {
	gorm.Model
	EducateName string
	Technician  []Technician `gorm:"foreignKey:EDUCATE_ID"`
}

type PrefixT struct {
	gorm.Model
	PrefixName string
	Technician []Technician `gorm:"foreignKey:PREFIX_ID"`
}

type Technician struct {
	gorm.Model
	Name    string	`valid:"required~Name cannot be blank"`
	ID_card string	`valid:"required~คุณยังไม่ได้กรอก เลขบัตรประชาชน"`
	DOB     time.Time
	Phone   string	`valid:"required~คุณยังไม่ได้กรอก เบอร์มือถือ, matches(^\\d{10}$)~เลขเบอร์โทรศัพท์ต้องมี 10 ตัว"`

	GENDER_ID *uint
	GENDER    GenderT `gorm:"references:id" valid:"-"`

	EDUCATE_ID *uint
	EDUCATE    Educate `gorm:"references:id" valid:"-"`

	PREFIX_ID *uint
	PREFIX    PrefixT `gorm:"references:id" valid:"-"`

	Location string
	Username string `gorm:"uniqueIndex"`
	Password string 

	ROLE_ID	*uint
	ROLE	Role	`gorm:"references:id" valid:"-"`

	OrderTech []OrderTech `gorm:"foreignKey:TechnicianID"`
	PayTech   []PayTech   `gorm:"foreignKey:TechnicianID"`
}
