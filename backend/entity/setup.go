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

		//========== Refund ==========
		&Cause{},
		&Contact{},
		&Refund{},
		//========== Refund ==========

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
	customer_1 := Customer{
		Name:     "ลูกค้า 1",
		ID_card:  "1-4000-00000-00-1",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    0641231231,
		GENDER:   male,
		CAREER:   gov_o,
		PREFIX:   mr,
		Email:    "customer01@example.com",
		Password: "123456789",
	}
	db.Model(&Customer{}).Create(&customer_1)

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
	technician_1 := Technician{
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
	}
	db.Model(&Technician{}).Create(&technician_1)

	// ====== Mockup Address ========

	aType_1 := AddressType{
		Type_Name: "บ้าน",
	}
	db.Model(&AddressType{}).Create(&aType_1)

	aType_2 := AddressType{
		Type_Name: "สำนักงาน",
	}
	db.Model(&AddressType{}).Create(&aType_2)

	province_1 := Province{
		Province_Name: "อุบลราชธานี",
	}
	db.Model(&Province{}).Create(&province_1)
	province_2 := Province{
		Province_Name: "มุกดาหาร",
	}
	db.Model(&Province{}).Create(&province_2)
	province_3 := Province{
		Province_Name: "ศรีสะเกษ",
	}
	db.Model(&Province{}).Create(&province_3)

	District_1 := District{
		District_Name: "อำเภอในมุกดาหาร",
		Province:      province_2,
	}
	db.Model(&District{}).Create(&District_1)
	District_2 := District{
		District_Name: "อำเภอในศรีสะเกษ",
		Province:      province_3,
	}
	db.Model(&District{}).Create(&District_2)

	tambon_1 := Tambon{
		Tambon_Name: "ตำบลในศรีสะเกษ",
		District:    District_2,
	}
	db.Model(&Tambon{}).Create(&tambon_1)
	tambon_2 := Tambon{
		Tambon_Name: "ตำบลในมุกดาหาร",
		District:    District_1,
	}
	db.Model(&Tambon{}).Create(&tambon_2)

	address_1 := Address{
		Customer:    customer_1,
		AddressType: aType_1,
		Tambon:      tambon_2,
		Post_Code:   34190,
		Detail:      "test Mockup",
		Record_Time: time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
	}
	db.Model(&Address{}).Create(&address_1)

	// ====== Mockup Address ========

	// ====== Mockup Device ========

	typeD_1 := Type{
		Type_Name: "PC",
	}
	db.Model(&Type{}).Create(&typeD_1)
	typeD_2 := Type{
		Type_Name: "Notebook",
	}
	db.Model(&Type{}).Create(&typeD_2)

	wind_1 := Windows{
		Windows_Name: "Window XP",
	}
	db.Model(&Windows{}).Create(&wind_1)

	wind_2 := Windows{
		Windows_Name: "Window 7",
	}
	db.Model(&Windows{}).Create(&wind_2)
	wind_3 := Windows{
		Windows_Name: "Window 10",
	}
	db.Model(&Windows{}).Create(&wind_3)
	wind_4 := Windows{
		Windows_Name: "Window 11",
	}
	db.Model(&Windows{}).Create(&wind_4)
	wind_5 := Windows{
		Windows_Name: "MacOS",
	}
	db.Model(&Windows{}).Create(&wind_5)

	device_1 := Device{
		CPU:      "Intel Core i7 7700K",
		Monitor:  "Zowie XLSK1994S",
		GPU:      "Geforce RTX 4050",
		RAM:      "CORSAIR DOMINATOR PLATINUM RGB 16GB",
		Harddisk: "WD Blue 1TB",
		Problem:  "test Problem",
		Customer: customer_1,
		Type:     typeD_1,
		Windows:  wind_1,
	}
	db.Model(&Device{}).Create(&device_1)

	// ====== Mockup Device ========

	// ====== Mockup Order ========

	Case_1 := CASE{
		Case_text: "จอฟ้า",
		Level_case: "Software or Hardware",
	}
	db.Model(&Hardware{}).Create(&Case_1)
	Case_2 := CASE{
		Case_text: "ชาร์จไฟไม่เข้า",
		Level_case: "Hardware",
	}
	db.Model(&Hardware{}).Create(&Case_2)
	Case_3 := CASE{
		Case_text: "จอกระพริย",
		Level_case: "Software or Hardware",
	}
	db.Model(&Hardware{}).Create(&Case_3)

	Order_1 := ORDER{
		Reason: "เครื่องคอมเสียงดัง",
		Limit:  12000,
		Customer: customer_1,
		CASE:     Case_1,
		Device:  device_1,
		Address: address_1,
	}
	db.Model(&Device{}).Create(&Order_1)

	// ====== Mockup Order ========

	// ====== Mockup Refund ========

	database.Create(&Cause{Cause_text: "การร้องขอคืนเงินด้วยเหตุผลส่วนตัว ", By_text: "ลูกค้า"})
	database.Create(&Cause{Cause_text: "การร้องขอคืนเงินด้วยเหตุผลความไม่พอใจ", By_text: "ช่างซ่อมคอมพิวเตอร์"})
	database.Create(&Cause{Cause_text: "การร้องขอคืนเงินด้วยเหตุผลความไม่พอใจ ", By_text: "เว็บไซต์"})

	database.Create(&Contact{Contact: "Promtpay", Times: "7 วัน"})
	database.Create(&Contact{Contact: "เงินสด ", Times: "14 วัน"})
	database.Create(&Contact{Contact: "wallet", Times: "10 วัน"})

	// ====== Mockup Refund ========

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
