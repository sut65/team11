package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Sender_Name_not_blank(t *testing.T) {
	g := NewGomegaWithT(t)

	Payment := Payment{
		Amount:       10.2,
		Amount_Check: 10.2,
		Bank_ID:      1,
		Date_time:    time.Now(),
		OrderTech_ID: 1,
		Sender_Name:  "",
		Status_ID:    0,
		CustomerID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ท่านกรอกรายชื่อไม่ถูกต้อง"))
}

func Test_Amout_not_negative(t *testing.T) {
	g := NewGomegaWithT(t)

	Payment := Payment{
		Amount:       -10,
		Amount_Check: 10.2,
		Bank_ID:      1,
		Date_time:    time.Now(),
		OrderTech_ID: 1,
		Sender_Name:  "Pattanasak",
		Status_ID:    0,
		CustomerID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("คุณใส่จำนวนเงินไม่ถูกต้อง"))
}
// func Test_Date_not_future(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	Payment := Payment{
// 		Amount:       10.0,
// 		Amount_Check: 10.2,
// 		Bank_ID:      1,
// 		Date_time:    time.Now().Add(time.Hour * 24),
// 		OrderTech_ID: 1,
// 		Sender_Name:  "Pattanasak",
// 		Status_ID:    0,
// 		CustomerID:   1,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(Payment)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
// }
