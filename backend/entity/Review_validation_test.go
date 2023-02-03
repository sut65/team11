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
		CheckedPayment_ID:          1,
		Satisfaction_System_ID:     5,
		Review_Comment_System:      "Great",
		Satisfaction_Technician_ID: 5,
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now(),
		StatusReview:               false, // ผิด -->เช็คตรงนี้
		Customer_ID:                1,
		CheckSucceed:               false,
	}

	// Validate the struct
	ok, err := govalidator.ValidateStruct(review)
	g.Expect(ok).To(BeFalse())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("!! โอ๊ะโอวววว เหมือนคุณจะลืมกด check box !!"))
}

func TestMaxcharector200ForReview_Comment_System(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		CheckedPayment_ID:          1,
		Satisfaction_System_ID:     5,
		Review_Comment_System:      "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
		Satisfaction_Technician_ID: 5,
		Review_Comment_Technician:  "Great",
		TimestampReview:            time.Now(),
		StatusReview:               true,
		Customer_ID:                1,
		CheckSucceed:               false,
	}

	// Validate the struct
	ok, err := govalidator.ValidateStruct(review)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("!! โอ๊ะโอวว แสดงความคิดเห็นต่อระบบได้ไม่เกิน 200 อักษร !!"))
}

func TestMaxcharector200ForReview_Comment_Technician(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{
		CheckedPayment_ID:          1,
		Satisfaction_System_ID:     5,
		Review_Comment_System:      "Great",
		Satisfaction_Technician_ID: 5,
		Review_Comment_Technician:  "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
		TimestampReview:            time.Now(),
		StatusReview:               true,
		Customer_ID:                1,
		CheckSucceed:               false,
	}

	// Validate the struct
	ok, err := govalidator.ValidateStruct(review)
	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("!! โอ๊ะโอวว แสดงความคิดเห็นต่อช่างได้ไม่เกิน 200 อักษร !!"))
}
