package entity

import (
	"time"

	"gorm.io/gorm"
)

type Gender struct {
	gorm.Model
	GenderName string
	Customer   []Customer `gorm:"foreignKey:GENDER_ID"`
}

type Career struct {
	gorm.Model
	CareerName string
	Customer   []Customer `gorm:"foreignKey:CAREER_ID"`
}

type Prefix struct {
	gorm.Model
	PrefixName string
	Customer   []Customer `gorm:"foreignKey:PREFIX_ID"`
}

type Role struct {
	gorm.Model
	RoleName   string
	Customer   []Customer   `gorm:"foreignKey:ROLE_ID"`
	Technician []Technician `gorm:"foreignKey:ROLE_ID"`
	ADMIN      []Admin      `gorm:"foreignKey:ROLE_ID"`
}

type Customer struct {
	gorm.Model
	Name    string	`valid:"required~Name cannot be blank"`
	ID_card string	`valid:"required~คุณยังไม่ได้กรอก เลขบัตรประชาชน"`
	DOB     time.Time 
	Phone   string	`valid:"required~คุณยังไม่ได้กรอก เบอร์มือถือ, matches(^\\d{10}$)~เลขเบอร์โทรศัพท์ต้องมี 10 ตัว"`
	// Phone   string	`valid:"required~คุณยังไม่ได้กรอก เบอร์มือถือ, matches(^//d{10}$)~เลขเบอร์โทรศัพท์ต้องมี 10 ตัว"`

	GENDER_ID *uint
	GENDER    Gender `gorm:"references:id" valid:"-"`

	CAREER_ID *uint
	CAREER    Career `gorm:"references:id" valid:"-"`

	PREFIX_ID *uint
	PREFIX    Prefix `gorm:"references:id" valid:"-"`

	Email    string `gorm:"uniqueIndex" valid:"email~Syntax: Email ไม่ถูกต้อง, required~คุณไม่ได้กรอก Email"`
	Password string

	ROLE_ID *uint
	ROLE    Role `gorm:"references:id" valid:"-"`

	Address         []Address         `gorm:"ForeignKey:CustomerID"`
	Device          []Device          `gorm:"ForeignKey:CustomerID"`
	ORDER           []ORDER           `gorm:"foreignKey:CustomerID"`
	Review          []Review          `gorm:"foreignKey:Customer_ID"`
	Payment         []Payment         `gorm:"foreignKey:CustomerID"`
}
