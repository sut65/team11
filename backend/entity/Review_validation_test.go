package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
)

func TestCheckBoxNotFalse(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Review_Comment_System:      "Great",
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now(),
		StatusReview:               false, // ผิด -->เช็คตรงนี้
		CheckSucceed:               true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เหมือนคุณจะลืมกด check box"))
}

func TestMaxcharector200ForReview_Comment_System(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Review_Comment_System:      "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789", // ผิด -->เช็คตรงนี้
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now(),
		StatusReview:               true,
		CheckSucceed:               true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("แสดงความคิดเห็นต่อระบบได้ไม่เกิน 200 อักษร"))
}

func TestMaxcharector200ForReview_Comment_Technician(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Review_Comment_System:      "Great",
		Review_Comment_Technician:  "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789", // ผิด -->เช็คตรงนี้
		TimestampReview:            time.Now(),
		StatusReview:               true,
		CheckSucceed:               true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("แสดงความคิดเห็นต่อช่างได้ไม่เกิน 200 อักษร"))
}

func TestTimestampReviewIsNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Review_Comment_System:      "Great",
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now().Add(time.Hour * 24), // ผิด -->เช็คตรงนี้
		StatusReview:               true,
		CheckSucceed:               true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())
	
	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}

func TestTimestampReviewIsNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		Review_Comment_System:      "Great",
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now().Add(-time.Hour * 24), // ผิด -->เช็คตรงนี้
		StatusReview:               true,
		CheckSucceed:               true,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(review)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())
	
	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}
