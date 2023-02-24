package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestPositiveTechnician(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Technician{
		Name:            "Natthawat",
		ID_card:         "1489900413819",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          GenderT{},
		EDUCATE_ID:       new(uint),
		EDUCATE:          Educate{},
		PREFIX_ID:       new(uint),
		Location:		"Suranaree",
		PREFIX:          PrefixT{},
		Username:           "B6311117",
		Password:        "11111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).To(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).To(BeNil())
}

//TODO Name cannot be Blank
func TestUserNameTechnicianNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Technician{
		Name:            "",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          GenderT{},
		EDUCATE_ID:       new(uint),
		EDUCATE:          Educate{},
		PREFIX_ID:       new(uint),
		Location:		"Muk",
		PREFIX:          PrefixT{},
		Username:           "B6311117",
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

//TODO id_card cannot blank
func TestId_cardTechnicianNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Technician{
		Name:            "นาถวัฒน์",
		ID_card:         "",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          GenderT{},
		EDUCATE_ID:       new(uint),
		EDUCATE:          Educate{},
		PREFIX_ID:       new(uint),
		Location:		"Muk",
		PREFIX:          PrefixT{},
		Username:           "B6311117",
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

//TODO Check phoneNumber Not Be Blank
func TestPhoneTechnicianNotBeBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Technician{
		Name:            "นาถวัฒน์",
		ID_card:         "1489900413999",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "",
		GENDER_ID:       new(uint),
		GENDER:          GenderT{},
		EDUCATE_ID:       new(uint),
		EDUCATE:          Educate{},
		PREFIX_ID:       new(uint),
		Location:		"Muk",
		PREFIX:          PrefixT{},
		Username:           "B6311117",
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
func TestPhoneNumberTechnician(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Technician{
		Name:            "นาถวัฒน์",
		ID_card:         "1489900413999",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "064328459a",
		GENDER_ID:       new(uint),
		GENDER:          GenderT{},
		EDUCATE_ID:       new(uint),
		EDUCATE:          Educate{},
		PREFIX_ID:       new(uint),
		Location:		"Muk",
		PREFIX:          PrefixT{},
		Username:           "B6311117",
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