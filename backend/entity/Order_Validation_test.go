package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Reason_Notblank(t *testing.T) {
	g := NewGomegaWithT(t)

	ORDER := ORDER{
		Date_time:  time.Now().Add(time.Hour * 24),
		Reason:     "",
		Limits:      10,
		CASEID:     1,
		StateID:    1,
		DeviceID:   1,
		AddressID:  1,
		CustomerID: 1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ORDER)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเหตุผลเพิ่มเติม ถ้าไม่มีให้ขีด -"))

}

func Test_Reason_NotSpecialharater(t *testing.T) {
	g := NewGomegaWithT(t)

	ORDER := ORDER{
		Date_time:  time.Now().Add(time.Hour * 24),
		Reason:     "fd@@",
		Limits:      10,
		CASEID:     1,
		StateID:    1,
		DeviceID:   1,
		AddressID:  1,
		CustomerID: 1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ORDER)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณาไม่ใช้ตัวอีกษรพิเศษ"))

}

func Test_Limit_IsNotNegativeNumbers(t *testing.T) {
	g := NewGomegaWithT(t)

	ORDER := ORDER{
		Date_time:  time.Now().Add(time.Hour * 24),
		Reason:     "dfgh",
		Limits:      -5,
		CASEID:     1,
		StateID:    1,
		DeviceID:   1,
		AddressID:  1,
		CustomerID: 1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ORDER)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเลขให้ไม่ติดลบ"))

}

func Test_Limit_IsNotZeroNumbers(t *testing.T) {
	g := NewGomegaWithT(t)

	ORDER := ORDER{
		Date_time:  time.Now().Add(time.Hour * 24),
		Reason:     "dfgh",
		Limits:      0,
		CASEID:     1,
		StateID:    1,
		DeviceID:   1,
		AddressID:  1,
		CustomerID: 1,
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(ORDER)

	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
	g.Expect(ok).NotTo(BeTrue())

	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
	g.Expect(err).NotTo(BeNil())

	// err.Error() ต้องมี message แสดงออกมา
	g.Expect(err.Error()).To(Equal("กรุณากรอกเลขให้ไม่มี 0"))

		

}

// func Test_DateTime_IsNotFuture_And_IsNotNow(t *testing.T) {
// 	g := NewGomegaWithT(t)

// 	ORDER := ORDER{
// 		Date_time:  time.Now(),
// 		Reason:     "dfgh",
// 		Limits:      1,
// 		CASEID:     1,
// 		StateID:    1,
// 		DeviceID:   1,
// 		AddressID:  1,
// 		CustomerID: 1,
// 	}

// 	// ตรวจสอบด้วย govalidator
// 	ok, err := govalidator.ValidateStruct(ORDER)

// 	// ok ต้องไม่เป็น true แปลว่าต้องจับ error ได้
// 	g.Expect(ok).NotTo(BeTrue())

// 	// err ต้องไม่เป็น nil แปลว่าต้องจับ error ได้
// 	g.Expect(err).NotTo(BeNil())

// 	// err.Error() ต้องมี message แสดงออกมา
// 	g.Expect(err.Error()).To(Equal("กรุณาเลือกวันที่ให้ให้ช่างไปซ่อมให้ถูกต้อง"))

	

// }