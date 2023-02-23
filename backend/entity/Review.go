package entity

import (
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
	"time"
)

// TODO B6304577 ---> REVIEW
type Satisfaction_System struct {
	gorm.Model
	Satisfaction_System_Type string
	Reviews                  []Review `gorm:"ForeignKey:Satisfaction_System_ID"`
}

type Satisfaction_Technician struct {
	gorm.Model
	Satisfaction_Technician_Type string
	Reviews                      []Review `gorm:"ForeignKey:Satisfaction_Technician_ID"`
}

type Review struct {
	gorm.Model
	CheckedPayment_ID      *uint
	Checked_payment        Checked_payment `gorm:"references:id" valid:"-"`
	
	Satisfaction_System_ID *uint
	Satisfaction_System    Satisfaction_System `gorm:"references:id" valid:"-"`

	Review_Comment_System string `valid:"maxstringlength(200)~แสดงความคิดเห็นต่อระบบได้ไม่เกิน 200 อักษร"`

	Satisfaction_Technician_ID *uint
	Satisfaction_Technician    Satisfaction_Technician `gorm:"references:id" valid:"-"`

	Review_Comment_Technician string `valid:"maxstringlength(200)~แสดงความคิดเห็นต่อช่างได้ไม่เกิน 200 อักษร"`

	TimestampReview time.Time `valid:"required,CheckDateTime_TimestampReview~กรุณาตรวจสอบวันที่ให้ถูกต้อง"`

	StatusReview bool `valid:"required~เหมือนคุณจะลืมกด check box"`

	Customer_ID  *uint
	Customer     Customer `gorm:"references:id" valid:"-"`

	CheckSucceed bool

	CheckDisableBtEditAndDel bool // ใช้เช็คสถานะของปุ่ม Edit และ Delete ใน ตาราง Review หากมีการ กดบันทึกในระบบรายงานปัญหาหลังหารซ่อม จะ Disable ปุ่ม

	Claim_Order []Claim_Order `gorm:"ForeignKey:Review_ID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime_TimestampReview", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-30 * time.Minute)) || t.After(time.Now().Add(30 * time.Minute)) {
			return false

		} else {
			return true
		}
	})
}
