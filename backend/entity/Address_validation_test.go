package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_Postcode_not_blank(t *testing.T) {
	g := NewGomegaWithT(t)

	Address := Address{
		Customer:      Customer{},
		CustomerID:    new(uint),
		AddressTypeID: new(uint),
		AddressType:   AddressType{},
		TambonID:      new(uint),
		Tambon:        Tambon{},
		Post_Code:     0,
		Detail:        "test",
		Record_Time:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Address)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสไปรษณีย์"))
}

func Test_Postcode_5_Digit(t *testing.T) {
	g := NewGomegaWithT(t)

	Address := Address{
		Customer:      Customer{},
		CustomerID:    new(uint),
		AddressTypeID: new(uint),
		AddressType:   AddressType{},
		TambonID:      new(uint),
		Tambon:        Tambon{},
		Post_Code:     123456,
		Detail:        "test",
		Record_Time:   time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Address)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกรหัสไปรษณีย์ 5 หลัก"))
}
