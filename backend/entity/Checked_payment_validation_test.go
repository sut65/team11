package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Other_notOver100_checkedpayment(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:  time.Now(),
		Payment_ID: 1,
		Other:      "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789_11",
		Message:    "ทดสอบ",
		Status_ID:  0,
		Admin_ID:   1,
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

		Date_time:  time.Now().Add(24 * time.Hour),
		Payment_ID: 1,
		Other:      "message",
		Message:    "message",
		Status_ID:  0,
		Admin_ID:   1,
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

		Date_time:  time.Now().Add(-24 * time.Hour),
		Payment_ID: 1,
		Other:      "message",
		Message:    "ทดสอบ ทดสอบ __ ทดสอบ",
		Status_ID:  0,
		Admin_ID:   1,
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
func Test_Check_letter_number_only(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:  time.Now(),
		Payment_ID: 1,
		Other:      "iusuibfbkjfkbdfbv{;:;[]+_}hwhofwehoweh",
		Message:    "ข้อความถึงลูกค้า",
		Status_ID:  0,
		Admin_ID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("โปรดใส่เฉพาะข้อความ ตัวเลข และ @ / _ และ เว้นวรรค เท่านั้น"))
}
func Test_Message_not_over100(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:  time.Now(),
		Payment_ID: 1,
		Other:      "message",
		Message:    "0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789_11",
		Status_ID:  0,
		Admin_ID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ส่งข้อความถึงลูกค้าได้ไม่เกิน 100 อักษร"))
}

func Test_all_true_checkedpayment(t *testing.T) {
	g := NewGomegaWithT(t)

	Checked_payment := Checked_payment{

		Date_time:  time.Now(),
		Payment_ID: 1,
		Other:      " this test",
		Message:    "message to customer",
		Status_ID:  0,
		Admin_ID:   1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Checked_payment)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}
