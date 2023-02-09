package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
)
func Test_Other_notOver100_checkedpayment(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:    time.Now(),
		Payment_ID: 1,
		Other:  "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789_11",
		Status_ID:    0,
		CustomerID:   1,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("แสดงความคิดเห็นได้ไม่เกิน 100 อักษร"))
}
func Test_Date_not_futue_checkedpayment(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:    time.Now().Add(24 * time.Hour),
		Payment_ID: 1,
		Other:  "สวัสดี",
		Status_ID:    0,
		CustomerID:   1,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}
func Test_Date_not_pass_checkedpayment(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:    time.Now().Add(-24 * time.Hour),
		Payment_ID: 1,
		Other:  "สวัสดี",
		Status_ID:    0,
		CustomerID:   1,

	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}









