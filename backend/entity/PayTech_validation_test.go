package entity

import (
	"testing"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestMaxcharector200_NoteProblem(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "When its gone, its gone, its gone, its gone, its gone You dead wrong, so wrong, so wrong, so wrong, so wrong So just scoo do do doot baby Its a wrap for you baby (It's a wrap) Its a wrap for you boy (It's a wrap) Oh baby When its gone, its gone, its gone, its gone, its gone You dead wrong, so wrong, so wrong, so wrong, so wrong So just scoo do do doot baby Its a wrap for you baby (It's a wrap) Its a wrap for you boy (It's a wrap) Oh baby When its gone, its gone, its gone, its gone, its gone You dead wrong, so wrong, so wrong, so wrong, so wrong So just scoo do do doot baby Its a wrap for you baby (It's a wrap) Its a wrap for you boy (It's a wrap) Oh baby When its gone, its gone, its gone, its gone, its gone You dead wrong, so wrong, so wrong, so wrong, so wrong So just scoo do do doot baby Its a wrap for you baby (It's a wrap) Its a wrap for you boy (It's a wrap) Oh baby",
		// Note:         "hello every one",
		Amount:       20,
		CostHardware: 4200,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรอกได้สูงสุด 200 ตัวอักษร"))
}

func TestNote_Not_SpecialCharacters(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "%$&",
		Amount:       20,
		CostHardware: 4200,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Solving must be A-Z a-z ก-ฮ ./()"))
}

func TestNoteNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "",
		Amount:       20,
		CostHardware: 4200,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Please enter a Note."))
}

func TestAmountLessThenZero(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "hello every one",
		Amount:       -9,
		CostHardware: 4200,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("จำนวนไม่สามารถติดลบได้"))
}

func TestCostLessThenZero(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "kk",
		Amount:       42,
		CostHardware: -99,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("ราคาไม่สามารถติดลบได้"))
}

func TestAmountISZero(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "kk",
		Amount:       0,
		CostHardware: 888,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกตัวเลขจำนวนมากกว่า 0"))
}

func TestCostISZero(t *testing.T) {
	g := NewGomegaWithT(t)

	paytech := PayTech{
		Note:         "kk",
		Amount:       999,
		CostHardware: 0,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(paytech)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกตัวเลขราคามากกว่า 0"))
}
