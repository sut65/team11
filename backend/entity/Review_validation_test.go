package entity

import (
	"testing"
	"time"
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func CheckBoxNotFalse(t *testing.T) {
	g := NewGomegaWithT(t)

	review := Review{	
						CheckedPayment_ID: 1,
						Satisfaction_System_ID:5,
						Review_Comment_System:"Great",
						Satisfaction_Technician_ID: 5,
						Review_Comment_Technician: "Great",
						TimestampReview:time.Now(),
						StatusReview:false, // ผิด -->เช็คตรงนี้
						Customer_ID:1,
						CheckSucceed:false,
					}

	// Validate the struct
	ok, err := govalidator.ValidateStruct(review)
	g.Expect(ok).To(BeFalse())
	g.Expect(err).ToNot(BeNil())
	g.Expect(err.Error()).To(Equal("!! โอ๊ะโอวววว เหมือนคุณจะลืมกด check box !!"))
}