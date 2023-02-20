package entity

import (
	"time"
	"unicode"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

type Cause struct {
	gorm.Model
	Cause_text string
	By_text    string
	Refund     []Refund `gorm:"foreignKey:CauseID"`
}

type Contact struct {
	gorm.Model
	Contact string
	Times   string
	Refund  []Refund `gorm:"foreignKey:ContactID"`
}

type Refund struct {
	gorm.Model
	Refund_Cause   string `valid:"required~กรุณากรอกเหตุผลที่ยกเลิกออเดอร์,isAlpha~กรุณาไม่ใช้ตัวอีกษรพิเศษ,maxstringlength(100)~กรอกเหตุผลไม่เกิน 100 อักษร"`
	Refund_Contact string `valid:"required~กรุณากรอกช่องทางการคืนเงิน,isAlpha~กรุณาไม่ใช้ตัวอีกษรพิเศษ"`
	Refund_time    time.Time
	StatusRefund	string

	OrderID uint
	ORDER   ORDER `gorm:"references:id" valid:"-"`

	CauseID uint
	Cause   Cause `gorm:"references:id" valid:"-"`

	ContactID uint
	Contact   Contact `gorm:"references:id" valid:"-"`

	CustomerID uint
	Customer   Customer `gorm:"references:id" valid:"-"`
}

func init() {
	govalidator.CustomTypeTagMap.Set("isAlpha", func(i interface{}, _ interface{}) bool {
		field, ok := i.(string)
		if !ok {
			return false
		}

		for _, char := range field {
			if !unicode.IsLetter(char) && !unicode.IsNumber(char) {
				return false
			}
		}
		return true
	})

}

