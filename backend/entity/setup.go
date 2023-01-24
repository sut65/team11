package entity

import (
	"time"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("se-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	//database.AutoMigrate(&User{})

	database.AutoMigrate(
		&Gender{},   // B6311117-ระบบสมาชิกแจ้งซ่อม
		&Career{},   // B6311117-ระบบสมาชิกแจ้งซ่อม
		&Prefix{},   // B6311117-ระบบสมาชิกแจ้งซ่อม
		&Customer{}, // B6311117-ระบบสมาชิกแจ้งซ่อม

		&GenderT{},    // B6311117-ระบบช่าง
		&Educate{},    // B6311117-ระบบช่าง
		&PrefixT{},    // B6311117-ระบบช่าง
		&Technician{}, // B6311117-ระบบช่าง

		// ========== Address ==========
		&AddressType{},
		&Province{},
		&District{},
		&Tambon{},
		&Address{},
		// ========== Address ==========

		// ========== Device ==========
		&Type{},
		&Windows{},
		&Device{},
		// ========== Device ==========

		//========== Order ==========
		&CASE{},
		&ORDER{},
		//========== Order ==========

		//========== OrderTech ==========
		&Status{},
		&Damage{},
		&CostDetail{},
		&OrderTech{},
		//========== OrderTech ==========
		//========== PayTech ==========
		&Hardware{},
		&PayTech{},
		//========== PayTech ==========

		//========== ระบบชำระเงิน ==========
		&Bank{},
		&Payment{},
		//========== ระบบตรวจสอบการชำระเงิน ==========
		&Status_check{},
		&Checked_payment{},
		//===========================================

		&Satisfaction_System{},     // B6304577-ระบบประเมินความพึงพอใจ
		&Satisfaction_Technician{}, // B6304577-ระบบประเมินความพึงพอใจ
		&Review{},                  // B6304577-ระบบประเมินความพึงพอใจ

		&Urgency{},     // B6304577-ระบบรายงานปัญหาหลังการซ่อม
		&StatusClaim{}, // B6304577-ระบบรายงานปัญหาหลังการซ่อม
		&Claim_Order{}, // B6304577-ระบบรายงานปัญหาหลังการซ่อม

	)
	db = database

	// Mockup  ======ระบบสมาชิกแจ้งซ่อม========
	//Gender
	male := Gender{
		GenderName: "ชาย",
	}
	db.Model(&Gender{}).Create(&male)
	female := Gender{
		GenderName: "หญิง",
	}
	db.Model(&Gender{}).Create(&female)

	//Career
	gov_o := Career{
		CareerName: "ข้าราชการ",
	}
	db.Model(&Career{}).Create(&gov_o)
	wfh := Career{
		CareerName: "รับจ้าง",
	}
	db.Model(&Career{}).Create(&wfh)
	trade := Career{
		CareerName: "ค้าขาย",
	}
	db.Model(&Career{}).Create(&trade)
	student := Career{
		CareerName: "นักเรียน/นักศึกษา",
	}
	db.Model(&Career{}).Create(&student)
	another := Career{
		CareerName: "อื่นๆ",
	}
	db.Model(&Career{}).Create(&another)

	//Prefix
	mr := Prefix{
		PrefixName: "นาย",
	}
	db.Model(&Prefix{}).Create(&mr)
	miss := Prefix{
		PrefixName: "นางสาว",
	}
	db.Model(&Prefix{}).Create(&miss)
	mrs := Prefix{
		PrefixName: "นาง",
	}
	db.Model(&Prefix{}).Create(&mrs)

	//Customer
	db.Model(&Customer{}).Create(&Customer{
		Name:     "ลูกค้า 1",
		ID_card:  "1-4000-00000-00-1",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    0641231231,
		GENDER:   male,
		CAREER:   gov_o,
		PREFIX:   mr,
		Email:    "customer01@example.com",
		Password: "123456789",
	})

	// Mockup  ======ระบบช่าง========
	//GenderT
	maleT := GenderT{
		GenderName: "ชาย",
	}
	db.Model(&GenderT{}).Create(&maleT)
	femaleT := GenderT{
		GenderName: "หญิง",
	}
	db.Model(&GenderT{}).Create(&femaleT)

	//PrefixT
	mrT := PrefixT{
		PrefixName: "นาย",
	}
	db.Model(&PrefixT{}).Create(&mrT)
	missT := PrefixT{
		PrefixName: "นางสาว",
	}
	db.Model(&PrefixT{}).Create(&missT)
	mrsT := PrefixT{
		PrefixName: "นาง",
	}
	db.Model(&PrefixT{}).Create(&mrsT)

	//Educate
	HSC := Educate{
		EducateName: "มัธยมศึกษาปีที่ 6",
	}
	db.Model(&Educate{}).Create(&HSC)
	BD := Educate{
		EducateName: "ปริญญาตรี",
	}
	db.Model(&Educate{}).Create(&BD)
	MD := Educate{
		EducateName: "ปริญญาโท",
	}
	db.Model(&Educate{}).Create(&MD)
	DD := Educate{
		EducateName: "ปริญญาเอก",
	}
	db.Model(&Educate{}).Create(&DD)

	//Technician
	db.Model(&Technician{}).Create(&Technician{
		Name:     "ช่าง 1",
		ID_card:  "1-4000-00000-01-1",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    0644444444,
		GENDER:   maleT,
		EDUCATE:  BD,
		PREFIX:   mrT,
		Location: "กรุงเทพ....",
		Username: "T6500001",
		Password: "1400000000011",
	})

	// ====== Mockup Device ========

	database.Create(&Type{Type_Name: "PC"})
	database.Create(&Type{Type_Name: "Notebook"})

	database.Create(&Windows{Windows_Name: "Window XP"})
	database.Create(&Windows{Windows_Name: "Window 7"})
	database.Create(&Windows{Windows_Name: "Window 10"})
	database.Create(&Windows{Windows_Name: "Window 11"})
	database.Create(&Windows{Windows_Name: "MacOS"})

	// ====== Mockup Device ========

	// ================== Mockup OrderTech ====================
	//Status
	StatusA := Status{
		StatusName: "ยังไม่ดำเนินการ",
	}
	db.Model(&Status{}).Create(&StatusA)
	StatusB := Status{
		StatusName: "กำลังดำเนินการ",
	}
	db.Model(&Status{}).Create(&StatusB)
	StatusC := Status{
		StatusName: "ดำเนินการเสร็จสิ้น",
	}
	db.Model(&Status{}).Create(&StatusC)

	//Damage
	DamageA := Damage{
		DamageName: "น้อย",
	}
	db.Model(&Damage{}).Create(&DamageA)
	DamageB := Damage{
		DamageName: "ปานกลาง",
	}
	db.Model(&Damage{}).Create(&DamageB)
	DamageC := Damage{
		DamageName: "มาก",
	}
	db.Model(&Damage{}).Create(&DamageC)

	//CostDetail
	CostDetailA := CostDetail{
		Cost: 300,
	}
	db.Model(&CostDetail{}).Create(&CostDetailA)
	CostDetailB := CostDetail{
		Cost: 500,
	}
	db.Model(&CostDetail{}).Create(&CostDetailB)
	CostDetailC := CostDetail{
		Cost: 700,
	}
	db.Model(&CostDetail{}).Create(&CostDetailC)
	CostDetailD := CostDetail{
		Cost: 1000,
	}
	db.Model(&CostDetail{}).Create(&CostDetailD)
	// ================== Mockup OrderTech ====================

	// ================== Mockup PayTech ======================
	//Hardware
	HardwareA := Hardware{
		HardwareName: "หน้าจอ",
		Amount:       1,
		CostHardware: 1600,
	}
	db.Model(&Hardware{}).Create(&HardwareA)
	HardwareB := Hardware{
		HardwareName: "สายไฟ",
		Amount:       1,
		CostHardware: 150,
	}
	db.Model(&Hardware{}).Create(&HardwareB)
	HardwareC := Hardware{
		HardwareName: "พัดลม",
		Amount:       1,
		CostHardware: 730,
	}
	db.Model(&Hardware{}).Create(&HardwareC)
	HardwareD := Hardware{
		HardwareName: "Software",
		Amount:       1,
		CostHardware: 200,
	}
	db.Model(&Hardware{}).Create(&HardwareD)
	
	// ================== Mockup PayTech ======================

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	//ตาราง Bank
	database.Create(&Bank{Bank_name: "ธนาคารกรุงเทพ จำกัด (มหาชน)"})
	database.Create(&Bank{Bank_name: "ธนาคารกรุงไทย จำกัด (มหาชน)"})
	database.Create(&Bank{Bank_name: "ธนาคารกสิกรไทย จำกัด (มหาชน)"})
	database.Create(&Bank{Bank_name: "ธนาคารไทยพาณิชย์ จำกัด (มหาชน)"})
	database.Create(&Bank{Bank_name: "อื่น ๆ โปรดระบุ"})
	//Demo สถานะ ระบบตรวจสอบการชำระเงิน
	database.Create(&Status_check{Status_name: "รอการตรวจสอบ"})
	database.Create(&Status_check{Status_name: "กำลังตรวจสอบ"})
	database.Create(&Status_check{Status_name: "ชำระไม่สำเร็จ"})
	database.Create(&Status_check{Status_name: "ชำระเสร็จสิ้น"})

	////////////////////////////////////////////////////////////////////////////////////////////////////////

}
