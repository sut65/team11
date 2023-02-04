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
	CheckedPayment_ID      uint
	Checked_payment        Checked_payment `gorm:"references:id"`
	Satisfaction_System_ID uint
	Satisfaction_System    Satisfaction_System `gorm:"references:id"`

	Review_Comment_System string `valid:"maxstringlength(200)~!! โอ๊ะโอวว แสดงความคิดเห็นต่อระบบได้ไม่เกิน 200 อักษร !!"`

	Satisfaction_Technician_ID uint
	Satisfaction_Technician    Satisfaction_Technician `gorm:"references:id"`

	Review_Comment_Technician string `valid:"maxstringlength(200)~!! โอ๊ะโอวว แสดงความคิดเห็นต่อช่างได้ไม่เกิน 200 อักษร !!"`

	TimestampReview time.Time `valid:"required,IsNotInFuture~โอ๊ะโอวว กรุณาตรวจสอบวันเวลาให้ถูกต้อง,IsNotInPast~โอ๊ะโอวว กรุณาตรวจสอบวันเวลาให้ถูกต้อง"`

	StatusReview    bool `valid:"required~!! โอ๊ะโอวววว เหมือนคุณจะลืมกด check box !!"`
	Customer_ID     uint
	Customer        Customer `gorm:"references:id"`
	CheckSucceed    bool

	Claim_Order []Claim_Order `gorm:"ForeignKey:Review_ID"`
}

func init()  {
	govalidator.CustomTypeTagMap.Set("IsNotInFuture", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now()){
			return true
			
		}else {
			return false
		}
	})
	govalidator.CustomTypeTagMap.Set("IsNotInPast", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		if t.After(time.Now().Add(-time.Hour * 24)){
			return true
			
		}else {
			return false
		}
	})
}