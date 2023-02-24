package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPositiveCustomer(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "1489900413819",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "naaaaa12344",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}


//TODO Name cannot be Blank
func TestUserNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}

//TODO Email cannot be blank
func TestEmailNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("คุณไม่ได้กรอก Email"))
}

//TODO Email
func TestEmail(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "hgjgj",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Syntax: Email ไม่ถูกต้อง"))
}

//TODO Check phoneNumber Not Be Blank
func TestPhoneNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("คุณยังไม่ได้กรอก เบอร์มือถือ"))
}

//TODO Check phonNumber is digit and length is 10
func TestPhoneNumber(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "1489900413800",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "06432",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("เลขเบอร์โทรศัพท์ต้องมี 10 ตัว"))
}


//TODO id_card cannot blank
func TestId_cardNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "Natthawat",
		ID_card:         "",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("คุณยังไม่ได้กรอก เลขบัตรประชาชน"))
}