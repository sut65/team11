package entity

import (
	"time"

	"gorm.io/gorm"
)

type Province struct {
	gorm.Model
	Province_Name      string
	Address []Address `gorm:"ForeignKey:ProvinceID"`
}

type District struct {
	gorm.Model
	District_Name      string
	Address []Address `gorm:"ForeignKey:DistrictID"`
}

type Tambon struct {
	gorm.Model
	Tambon_Name		   string
	Address []Address `gorm:"ForeignKey:TambonID"`
}

type Address struct {
	gorm.Model
	Post_Code	   		int
	Detail				string
	Record_Time			time.Time

	CustomerID				*uint
	Customer				Customer `gorm:"references:id"`

	ProvinceID               *uint
	Province                  Province `gorm:"references:id"`

	DistrictID               *uint
	District                  District`gorm:"references:id"`

	TambonID               *uint
	Tambon                  Tambon `gorm:"references:id"`

	ORDER []ORDER `gorm:"ForeignKey:AddressID"`
	ADDRESSED []ADDRESSED `gorm:"ForeignKey:AddressID"`

}
