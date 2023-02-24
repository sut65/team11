package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPositiveOrderTech(t *testing.T) {
	g := NewGomegaWithT(t)

	ordertech := OrderTech{
		Solving: "hi",
		TimeOut: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ordertech)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}

func TestTimeOutIsNotPast(t *testing.T) {
	g := NewGomegaWithT(t)

	ordertech := OrderTech{
		Solving: "hi",
		TimeOut: time.Now().Add(-time.Hour * 24), // ผิด -->เช็คตรงนี้
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ordertech)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เวลาห้ามเป็นอดีต"))
}

func TestMaxcharector200_SolvingProblem(t *testing.T) {
	g := NewGomegaWithT(t)

	ordertech := OrderTech{
		Solving: "pls let me let me the one ให้ฉันคนนี้ดูแลเธอทุกวันเป็นฉันคนนี้ที่จะบอกว่าฉันรักเธอคนดี pls let me let me the one ให้ฉันคนนี้ดูแลเธอทุกวันเป็นฉันคนนี้ที่จะบอกว่าฉันรักเธอคนดี pls let me let me the one ให้ฉันคนนี้ดูแลเธอทุกวันเป็นฉันคนนี้ที่จะบอกว่าฉันรักเธอคนดี pls let me let me the one ให้ฉันคนนี้ดูแลเธอทุกวันเป็นฉันคนนี้ที่จะบอกว่าฉันรักเธอคนดี pls let me let me the one ให้ฉันคนนี้ดูแลเธอทุกวันเป็นฉันคนนี้ที่จะบอกว่าฉันรักเธอคนดี", // ผิด -->เช็คตรงนี้
		TimeOut: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ordertech)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรอกได้สูงสุด 200 ตัวอักษร"))
}

func TestSolving_Not_SpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)

	ordertech := OrderTech{
		Solving: "%$#", // ผิด -->เช็คตรงนี้
		TimeOut: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ordertech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Solving must be A-Z a-z ก-ฮ ./()"))
}

func TestSolvingNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	ordertech := OrderTech{
		Solving: "", // ผิด -->เช็คตรงนี้
		TimeOut: time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ordertech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a solving."))
}
