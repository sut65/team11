package entity

import (
	"time"
	"unicode"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Status_check struct {
	gorm.Model
	Status_name string `gorm:"uniqueIndex"`
	// สถานะ 1 สถานะ เป็นได้หลาย รายการตรวจสอบการชำระเงิน
	//Checked_payment []Checked_payment `gorm:"foreignKey:Status_ID"`
}

type Checked_payment struct {
	gorm.Model
	Date_time time.Time `valid:"required,CheckDateTime_Time_checkpayment~กรุณาตรวจสอบวันที่ให้ถูกต้อง"`
	Other     string    `valid:"maxstringlength(100)~แสดงความคิดเห็นได้ไม่เกิน 100 อักษร,Check_letter_number_only~โปรดใส่เฉพาะข้อความ ตัวเลข และ @ / _ และ เว้นวรรค เท่านั้น"`
	Message   string    `valid:"maxstringlength(100)~ส่งข้อความถึงลูกค้าได้ไม่เกิน 100 อักษร"`

	//ส่วนที่ดึงมาจากตาราง se	อื่น
	Status_ID    uint
	Status_check Status_check `gorm:"foreignkey:Status_ID" valid:"-"` //chat GPT บอกมา

	Payment_ID uint
	Payment    Payment `gorm:"references:id" valid:"-"`


	Admin_ID   uint
	Admin   Admin `gorm:"references:id" valid:"-"`

	CheckForShowReviewBT bool  // ใช้กับระบบอาร์ม อาร์มเป็นคนเพิ่ม 

	//เชื่อให้อาร์ม
	Review []Review `gorm:"foreignKey:CheckedPayment_ID"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("CheckDateTime_Time_checkpayment", func(i interface{}, _ interface{}) bool {
		t := i.(time.Time)
		if t.Before(time.Now().Add(-5*time.Minute)) || t.After(time.Now().Add(5*time.Minute)) {
			return false

		} else {
			return true
		}
	})

	govalidator.CustomTypeTagMap.Set("Check_letter_number_only", func(i interface{}, _ interface{}) bool {
		field, ok := i.(string)
		if !ok {
			return false
		}

		for _, char := range field {
			if !unicode.IsLetter(char) && !unicode.IsNumber(char) && !unicode.In(char, &unicode.RangeTable{R16: []unicode.Range16{{0x0E01, 0x0E3A, 1}, {0x0E40, 0x0E5B, 1}, {0x0E2F, 0x0E2F, 1}, {0x0E40, 0x0E4c, 1}}}) && char != '@' && char != '/' && char != '_' && !unicode.IsSpace(char) {
				return false
			}
		}
		return true
	})

}
