package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Cause_Notblank(t *testing.T) {
	g := NewGomegaWithT(t)

	Refund := Refund{
		Refund_Cause:     "",
		Refund_Contact:   "sdfghjkl",
		Refund_time:  time.Now(),
		OrderID:     1,
		CauseID:    1,
		ContactID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Refund)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเหตุผลที่ยกเลิกออเดอร์"))

}

func Test_Cause_NotSpeialCharacter(t *testing.T) {
	g := NewGomegaWithT(t)

	Refund := Refund{
		Refund_Cause:     "dfghj@",
		Refund_Contact:   "sdfghjkl",
		Refund_time:  time.Now(),
		OrderID:     1,
		CauseID:    1,
		ContactID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Refund)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาไม่ใช้ตัวอีกษรพิเศษ"))

}

// func Test_Cause_CharacterNotMoreThan100(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	Refund := Refund{
// 		Refund_Cause:     "01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891111",
// 		Refund_Contact:   "sdfghjkl",
// 		Refund_time:  time.Now(),
// 		OrderID:     1,
// 		CauseID:    1,
// 		ContactID:   1,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(Refund)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรอกเหตุผลไม่เกิน 100 อักษร"))

// }

// func Test_Contact_Notblank(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	Refund := Refund{
// 		Refund_Cause:     "fghjk",
// 		Refund_Contact:   "",
// 		Refund_time:  time.Now(),
// 		OrderID:     1,
// 		CauseID:    1,
// 		ContactID:   1,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(Refund)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณากรอกช่องทางการคืนเงิน"))

// }

// func Test_Contact_NotSpeialCharacter(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	Refund := Refund{
// 		Refund_Cause:     "dfghj",
// 		Refund_Contact:   "sdfgh@jkl",
// 		Refund_time:  time.Now(),
// 		OrderID:     1,
// 		CauseID:    1,
// 		ContactID:   1,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(Refund)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณาไม่ใช้ตัวอีกษรพิเศษ"))

// }