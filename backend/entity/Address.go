package entity

import (
	"time"

	"gorm.io/gorm"
)

type AddressType struct {
	gorm.Model
	Type_Name		   string

	Address []Address `gorm:"ForeignKey:AddressTypeID"`
}

type Province struct {
	gorm.Model
	Province_Name      string

	District []District `gorm:"ForeignKey:ProvinceID"`
}

type District struct {
	gorm.Model
	District_Name      string

	ProvinceID         *uint
	Province 		   Province `gorm:"references:id"`

	Tambon []Tambon `gorm:"ForeignKey:DistrictID"`
}

type Tambon struct {
	gorm.Model
	Tambon_Name		   string

	DistrictID         *uint
	District 		   District `gorm:"references:id"`

	Address []Address `gorm:"ForeignKey:TambonID"`
}

type Address struct {
	gorm.Model

	CustomerID				*uint
	Customer				Customer `gorm:"references:id"`

	AddressTypeID			*uint
	AddressType				AddressType `gorm:"references:id"`

	TambonID               *uint
	Tambon                  Tambon `gorm:"references:id"`

	Post_Code	   		int
	Detail				string
	Record_Time			time.Time

	ORDER []ORDER `gorm:"ForeignKey:AddressID"`
}
