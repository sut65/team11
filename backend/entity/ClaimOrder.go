package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

type Urgency struct {
	gorm.Model
	Urgency_Type string
	Claim_Orders []Claim_Order `gorm:"ForeignKey:Urgency_ID"`
}
type StatusClaim struct {
	gorm.Model
	StatusClaim_Type string
	Claim_Order      []Claim_Order `gorm:"ForeignKey:StatusClaim_ID"`
}
type Claim_Order struct {
	gorm.Model

	Review_ID      *uint
	Review         Review `gorm:"references:id" valid:"-"`
	Urgency_ID     *uint
	Urgency        Urgency   `gorm:"references:id" valid:"-"`
	ClaimTime      time.Time `valid:"required,CheckDateTime_ClaimTime~กรุณาตรวจสอบวันที่ให้ถูกต้อง"`
	OrderProblem   string    `valid:"required~กรุณาแจ้งปัญหาที่พบ,maxstringlength(200)~รายงานปัญหาได้ไม่เกิน 200 อักษร"`
	Claim_Comment  string    `valid:"required~กรุณาแจ้งรายละเอียดเพิ่มเติมแก่เรา,maxstringlength(200)~แสดงความคิดเห็นได้ไม่เกิน 200 อักษร"`
	StatusClaim_ID *uint
	StatusClaim    StatusClaim `gorm:"references:id" valid:"-"`

	// Customer_ID               *uint
	// Customer                  Customer `gorm:"references:id"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime_ClaimTime", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-2*time.Minute)) || t.After(time.Now().Add(2*time.Minute)) {
			return false
		} else {
			return true
		}
	})
}
