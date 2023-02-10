package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func Test_CPU_not_blank(t *testing.T) {
	g := NewGomegaWithT(t)

	Device := Device{
		CPU:        "",
		Monitor:    "test",
		GPU:        "test",
		RAM:        "test",
		Harddisk:   "test",
		Problem:    "test",
		Customer:   Customer{},
		CustomerID: new(uint),
		TypeID:     new(uint),
		Type:       Type{},
		WindowsID:  new(uint),
		Windows:    Windows{},
		Save_Time:  time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Device)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกข้อมูล CPU"))
}

func Test_CPU_not_specialCharacter(t *testing.T) {
	g := NewGomegaWithT(t)

	Device := Device{
		CPU:        "asdsa# 123456",
		Monitor:    "test",
		GPU:        "test",
		RAM:        "test",
		Harddisk:   "test",
		Problem:    "test",
		Customer:   Customer{},
		CustomerID: new(uint),
		TypeID:     new(uint),
		Type:       Type{},
		WindowsID:  new(uint),
		Windows:    Windows{},
		Save_Time:  time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Device)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกข้อมูล CPU ไม่ถูกต้อง"))
}

func Test_Monitor_not_blank(t *testing.T) {
	g := NewGomegaWithT(t)

	Device := Device{
		CPU:        "test",
		Monitor:    "",
		GPU:        "test",
		RAM:        "test",
		Harddisk:   "test",
		Problem:    "test",
		Customer:   Customer{},
		CustomerID: new(uint),
		TypeID:     new(uint),
		Type:       Type{},
		WindowsID:  new(uint),
		Windows:    Windows{},
		Save_Time:  time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Device)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรุณากรอกข้อมูล Monitor"))
}

func Test_Monitor_not_specialCharacter(t *testing.T) {
	g := NewGomegaWithT(t)

	Device := Device{
		CPU:        "test",
		Monitor:    "#@ 123aabbcc",
		GPU:        "test",
		RAM:        "test",
		Harddisk:   "test",
		Problem:    "test",
		Customer:   Customer{},
		CustomerID: new(uint),
		TypeID:     new(uint),
		Type:       Type{},
		WindowsID:  new(uint),
		Windows:    Windows{},
		Save_Time:  time.Now(),
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(Device)

	g.Expect(ok).NotTo(BeTrue())
	g.Expect(err).NotTo(BeNil())
	g.Expect(err.Error()).To(Equal("กรอกข้อมูล Monitor ไม่ถูกต้อง"))
}
