package entity

import (
	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
	"testing"
	"time"
)

func TestClaimTimeIsNotFuture(t *testing.T) {
	g := NewGomegaWithT(t)

	claim_order := Claim_Order{
		ClaimTime:     time.Now().Add(time.Hour * 24), // ผิด -->เช็คตรงนี้
		OrderProblem:  "AAAA",
		Claim_Comment: "AAAA",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(claim_order)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}

func TestClaimTimeIsNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	claim_order := Claim_Order{
		ClaimTime:     time.Now().Add(-time.Hour * 24), // ผิด -->เช็คตรงนี้
		OrderProblem:  "AAAA",
		Claim_Comment: "AAAA",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(claim_order)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาตรวจสอบวันที่ให้ถูกต้อง"))
}

func TestOrderProblemNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	claim_order := Claim_Order{
		ClaimTime:     time.Now(),
		OrderProblem:  "", // ผิด -->เช็คตรงนี้
		Claim_Comment: "AAAA",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(claim_order)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาแจ้งปัญหาที่พบ"))
}

func TestClaim_CommentNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	claim_order := Claim_Order{
		ClaimTime:     time.Now(),
		OrderProblem:  "AAAA", 
		Claim_Comment: "", // ผิด -->เช็คตรงนี้
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(claim_order)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาแจ้งรายละเอียดเพิ่มเติมแก่เรา"))
}
