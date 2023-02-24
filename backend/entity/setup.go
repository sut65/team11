package entity

import (
	"time"

	"gorm.io/gorm"

	"gorm.io/driver/sqlite"

	"golang.org/x/crypto/bcrypt"

	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func mapJSONToProvince(jsonData map[string]interface{}) *Province {
	province := &Province{}
	province.ID = uint(jsonData["id"].(float64))
	province.Province_Name = jsonData["name_th"].(string)
	return province
}
func mapJSONToDistrict(jsonData map[string]interface{}) *District {
	district := &District{}
	district.ID = uint(jsonData["id"].(float64))
	district.District_Name = jsonData["name_th"].(string)
	provinceID := uint(jsonData["province_id"].(float64))
	district.ProvinceID = &provinceID
	return district
}
func mapJSONToTambon(jsonData map[string]interface{}) *Tambon {
	tambon := &Tambon{}
	tambon.ID = uint(jsonData["id"].(float64))
	tambon.Tambon_Name = jsonData["name_th"].(string)
	districtID := uint(jsonData["amphure_id"].(float64))
	tambon.DistrictID = &districtID
	return tambon
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
		&State{},
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

		&Role{},  //TODO ADD ROLE TABLE
		&Admin{}, //TODO ADD ADMIN TABLE

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

	//Role
	cust := Role{
		RoleName: "Customer",
	}
	db.Model(&Role{}).Create(&cust)
	techni := Role{
		RoleName: "Technician",
	}
	db.Model(&Role{}).Create(&techni)
	admin := Role{
		RoleName: "Admin",
	}
	db.Model(&Role{}).Create(&admin)

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

	// ====== Mockup Address ========

	aType_1 := AddressType{
		Type_Name: "บ้าน",
	}
	db.Model(&AddressType{}).Create(&aType_1)

	aType_2 := AddressType{
		Type_Name: "สำนักงาน",
	}
	db.Model(&AddressType{}).Create(&aType_2)

	url := "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
	spaceClient := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		log.Fatal(err)
	}

	res, getErr := spaceClient.Do(req)
	if getErr != nil {
		log.Fatal(getErr)
	}

	if res.Body != nil {
		defer res.Body.Close()
	}

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	var jsonProvinces []map[string]interface{}
	jsonErr := json.Unmarshal(body, &jsonProvinces)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	// Iterate over the slice of maps and create a new Province for each
	for _, jsonProvince := range jsonProvinces {
		province := mapJSONToProvince(jsonProvince)
		db.Create(province)
	}

	url2 := "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
	spaceClient2 := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req2, err := http.NewRequest(http.MethodGet, url2, nil)
	if err != nil {
		log.Fatal(err)
	}

	res2, getErr := spaceClient2.Do(req2)
	if getErr != nil {
		log.Fatal(getErr)
	}

	if res2.Body != nil {
		defer res2.Body.Close()
	}

	body2, readErr := ioutil.ReadAll(res2.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	var jsonDistricts []map[string]interface{}
	jsonErr2 := json.Unmarshal(body2, &jsonDistricts)
	if jsonErr2 != nil {
		log.Fatal(jsonErr2)
	}

	// Iterate over the slice of maps and create a new District for each
	for _, jsonDistrict := range jsonDistricts {
		district := mapJSONToDistrict(jsonDistrict)
		db.Create(district)
	}

	url3 := "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
	spaceClient3 := http.Client{
		Timeout: time.Second * 2, // Timeout after 2 seconds
	}

	req3, err := http.NewRequest(http.MethodGet, url3, nil)
	if err != nil {
		log.Fatal(err)
	}

	res3, getErr := spaceClient3.Do(req3)
	if getErr != nil {
		log.Fatal(getErr)
	}

	if res3.Body != nil {
		defer res3.Body.Close()
	}

	body3, readErr := ioutil.ReadAll(res3.Body)
	if readErr != nil {
		log.Fatal(readErr)
	}
	var jsonTambons []map[string]interface{}
	jsonErr3 := json.Unmarshal(body3, &jsonTambons)
	if jsonErr3 != nil {
		log.Fatal(jsonErr2)
	}

	// Iterate over the slice of maps and create a new Tambon for each
	for _, jsonTambon := range jsonTambons {
		tambon := mapJSONToTambon(jsonTambon)
		db.Create(tambon)
	}

	province_1 := Province{
		Province_Name: "testจังหวัด",
	}
	db.Model(&Province{}).Create(&province_1)

	District_1 := District{
		District_Name: "testอำเภอ",
		Province:      province_1,
	}
	db.Model(&District{}).Create(&District_1)

	tambon_1 := Tambon{
		Tambon_Name: "testตำบล",
		District:    District_1,
	}
	db.Model(&Tambon{}).Create(&tambon_1)

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

	// ====== Mockup Device ========

	// ====== Mockup Order ========

	Case_1 := CASE{
		Case_text:  "จอฟ้า",
		Level_case: "Software or Hardware",
	}
	db.Model(&CASE{}).Create(&Case_1)
	Case_2 := CASE{
		Case_text:  "ชาร์จไฟไม่เข้า",
		Level_case: "Hardware",
	}
	db.Model(&CASE{}).Create(&Case_2)
	Case_3 := CASE{
		Case_text:  "จอกระพริย",
		Level_case: "Software or Hardware",
	}
	db.Model(&CASE{}).Create(&Case_3)

	State_1 := State{
		State: "Ready",
	}
	db.Model(&State{}).Create(&State_1)

	State_2 := State{
		State: "Cancel",
	}
	db.Model(&State{}).Create(&State_2)

	State_3 := State{
		State: "Process",
	}
	db.Model(&State{}).Create(&State_3)
	//---------------------------------------------------------------
	State_4 := State{
		State: "Finish",
	}
	db.Model(&State{}).Create(&State_4)

	State_5 := State{
		State: "Process to Claim",
	}
	db.Model(&State{}).Create(&State_5)

	State_6 := State{
		State: "Claim Approve",
	}
	db.Model(&State{}).Create(&State_6)

	State_7 := State{
		State: "Claim Rejrct",
	}
	db.Model(&State{}).Create(&State_7)

	State_8 := State{
		State: "Process to Refund",
	}
	db.Model(&State{}).Create(&State_8)

	State_9 := State{
		State: "Refund Approve",
	}
	db.Model(&State{}).Create(&State_9)

	State_10 := State{
		State: "Refund Rejrct",
	}
	db.Model(&State{}).Create(&State_10)

	//---------------------------------------------------------------

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
		StatusName: "กำลังดำเนินการ",
	}
	db.Model(&Status{}).Create(&StatusA)
	StatusB := Status{
		StatusName: "ดำเนินการเสร็จสิ้น",
	}
	db.Model(&Status{}).Create(&StatusB)

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
		Cost: 200,
	}
	db.Model(&CostDetail{}).Create(&CostDetailA)
	CostDetailB := CostDetail{
		Cost: 300,
	}
	db.Model(&CostDetail{}).Create(&CostDetailB)
	CostDetailC := CostDetail{
		Cost: 400,
	}
	db.Model(&CostDetail{}).Create(&CostDetailC)
	CostDetailD := CostDetail{
		Cost: 500,
	}
	db.Model(&CostDetail{}).Create(&CostDetailD)
	CostDetailE := CostDetail{
		Cost: 600,
	}
	db.Model(&CostDetail{}).Create(&CostDetailE)
	CostDetailF := CostDetail{
		Cost: 700,
	}
	db.Model(&CostDetail{}).Create(&CostDetailF)
	CostDetailG := CostDetail{
		Cost: 800,
	}
	db.Model(&CostDetail{}).Create(&CostDetailG)
	CostDetailH := CostDetail{
		Cost: 900,
	}
	db.Model(&CostDetail{}).Create(&CostDetailH)
	CostDetailI := CostDetail{
		Cost: 1000,
	}
	db.Model(&CostDetail{}).Create(&CostDetailI)
	CostDetailJ := CostDetail{
		Cost: 1100,
	}
	db.Model(&CostDetail{}).Create(&CostDetailJ)
	CostDetailK := CostDetail{
		Cost: 1200,
	}
	db.Model(&CostDetail{}).Create(&CostDetailK)
	CostDetailL := CostDetail{
		Cost: 1300,
	}
	db.Model(&CostDetail{}).Create(&CostDetailL)
	CostDetailM := CostDetail{
		Cost: 1400,
	}
	db.Model(&CostDetail{}).Create(&CostDetailM)
	CostDetailN := CostDetail{
		Cost: 1500,
	}
	db.Model(&CostDetail{}).Create(&CostDetailN)
	// ================== Mockup OrderTech ====================

	// ================== Mockup PayTech ======================
	//Hardware
	HardwareA := Hardware{
		HardwareName: "หน้าจอ (Monitor)",
	}
	db.Model(&Hardware{}).Create(&HardwareA)
	HardwareB := Hardware{
		HardwareName: "สายไฟ (wire)",
	}
	db.Model(&Hardware{}).Create(&HardwareB)
	HardwareC := Hardware{
		HardwareName: "พัดลมระบายความร้อน (Fan Case)",
	}
	db.Model(&Hardware{}).Create(&HardwareC)
	HardwareD := Hardware{
		HardwareName: "ไดร์เวอร์ (Drivers)",
	}
	db.Model(&Hardware{}).Create(&HardwareD)
	HardwareE := Hardware{
		HardwareName: "ฮาร์ดดิสก์ (Hard Disk Drive)",
	}
	db.Model(&Hardware{}).Create(&HardwareE)
	HardwareF := Hardware{
		HardwareName: "เมมโมรี่ (Memory)",
	}
	db.Model(&Hardware{}).Create(&HardwareF)
	HardwareG := Hardware{
		HardwareName: "เมนบอร์ด (Motherboard)",
	}
	db.Model(&Hardware{}).Create(&HardwareG)
	HardwareH := Hardware{
		HardwareName: "เครื่องจักรสำหรับประมวลผล (CPU)",
	}
	db.Model(&Hardware{}).Create(&HardwareH)
	HardwareI := Hardware{
		HardwareName: "การ์ดจอ (Graphics Card)",
	}
	db.Model(&Hardware{}).Create(&HardwareI)
	HardwareJ := Hardware{
		HardwareName: "แหล่งจ่ายไฟ (Power Supply Unit)",
	}
	db.Model(&Hardware{}).Create(&HardwareJ)
	HardwareK := Hardware{
		HardwareName: "การ์ดเสียง (Sound Card)",
	}
	db.Model(&Hardware{}).Create(&HardwareK)
	HardwareL := Hardware{
		HardwareName: "แรม (RAM)",
	}
	db.Model(&Hardware{}).Create(&HardwareL)
	HardwareM := Hardware{
		HardwareName: "ชิปเซ็ต (Chipset)",
	}
	db.Model(&Hardware{}).Create(&HardwareM)
	HardwareN := Hardware{
		HardwareName: "แอนตี้ไวรัส (Antivirus)",
	}
	db.Model(&Hardware{}).Create(&HardwareN)
	HardwareO := Hardware{
		HardwareName: "อินเทอร์เน็ต (Internet software)",
	}
	db.Model(&Hardware{}).Create(&HardwareO)
	HardwareP := Hardware{
		HardwareName: "โปรแกรมเครื่องพิมพ์ (Printer software)",
	}
	db.Model(&Hardware{}).Create(&HardwareP)
	HardwareQ := Hardware{
		HardwareName: "ซอฟต์แวร์ประเภทโปรแกรมต่าง ๆ (Application software)",
	}
	db.Model(&Hardware{}).Create(&HardwareQ)
	HardwareR := Hardware{
		HardwareName: "อื่นๆ (Other)",
	}
	db.Model(&Hardware{}).Create(&HardwareR)
	//18 selection

	// ================== Mockup PayTech ======================

	////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ================== Mockup Payment ======================
	Bank_1 := Bank{Bank_name: "ธนาคารไทยพาณิชย์"}
	Bank_2 := Bank{Bank_name: "ธนาคารกสิกรไทย"}
	Bank_3 := Bank{Bank_name: "ธนาคารกรุงไทย"}
	Bank_4 := Bank{Bank_name: "ธนาคารกรุงเทพ"}
	Bank_5 := Bank{Bank_name: "ธนาคารกรุงศรีอยุธยา"}
	db.Model(&Bank{}).Create(&Bank_1)
	db.Model(&Bank{}).Create(&Bank_2)
	db.Model(&Bank{}).Create(&Bank_3)
	db.Model(&Bank{}).Create(&Bank_4)
	db.Model(&Bank{}).Create(&Bank_5)

	// ================== Mockup Payment ======================

	// ============== Mockup Checked_Payment ==================
	status_1 := Status_check{Status_name: "ยังไม่ชำระเงิน"}
	status_2 := Status_check{Status_name: "ชำระเงินเรียบร้อย"}
	status_3 := Status_check{Status_name: "รอตรวจสอบการชำระเงิน"}
	status_4 := Status_check{Status_name: "การชำระเงินไม่ถูกต้อง"}
	db.Model(&Status_check{}).Create(&status_1)
	db.Model(&Status_check{}).Create(&status_2)
	db.Model(&Status_check{}).Create(&status_3)
	db.Model(&Status_check{}).Create(&status_4)

	// ============== Mockup Checked_Payment ==================

	// ============== Mockup ตารางย่อยของระบบประเมินความพึงพอใจ ==================
	database.Create(&Satisfaction_System{Satisfaction_System_Type: "น้อยมาก"})
	database.Create(&Satisfaction_System{Satisfaction_System_Type: "น้อย"})
	database.Create(&Satisfaction_System{Satisfaction_System_Type: "ปานกลาง"})
	database.Create(&Satisfaction_System{Satisfaction_System_Type: "มาก"})
	database.Create(&Satisfaction_System{Satisfaction_System_Type: "มากที่สุด"})

	database.Create(&Satisfaction_Technician{Satisfaction_Technician_Type: "น้อยมาก"})
	database.Create(&Satisfaction_Technician{Satisfaction_Technician_Type: "น้อย"})
	database.Create(&Satisfaction_Technician{Satisfaction_Technician_Type: "ปานกลาง"})
	database.Create(&Satisfaction_Technician{Satisfaction_Technician_Type: "มาก"})
	database.Create(&Satisfaction_Technician{Satisfaction_Technician_Type: "มากที่สุด"})
	// ============== Mockup ตารางย่อยของระบบประเมินความพึงพอใจ ==================
	// ============== Mockup ตารางย่อยของระบบรายงานปัญหาหลังการซ่อม ==================
	database.Create(&Urgency{Urgency_Type: "น้อย"})
	database.Create(&Urgency{Urgency_Type: "ปานกลาง"})
	database.Create(&Urgency{Urgency_Type: "มาก"})

	database.Create(&StatusClaim{StatusClaim_Type: "รอการอนุมัติ"})
	database.Create(&StatusClaim{StatusClaim_Type: "อนุมัติ"})
	database.Create(&StatusClaim{StatusClaim_Type: "ไม่อนุมัติ"})

	// ============== Mockup ตารางย่อยของระบบรายงานปัญหาหลังการซ่อม ==================

	// ============== Mockup ตาราง Refund ของฟิวส์ ===================================

	Cause_1 := Cause{
		Cause_text: "การร้องขอคืนเงินด้วยเหตุผลส่วนตัว",
		By_text:    "ลูกค้า",
	}
	db.Model(&Cause{}).Create(&Cause_1)
	Cause_2 := Cause{
		Cause_text: "การร้องขอคืนเงินด้วยเหตุผลความไม่พอใจ",
		By_text:    "ช่างซ่อมคอมพิวเตอร",
	}
	db.Model(&Cause{}).Create(&Cause_2)
	Cause_3 := Cause{
		Cause_text: "การร้องขอคืนเงินด้วยเหตุผลความไม่พอใจ",
		By_text:    "เว็บไซต",
	}
	db.Model(&Cause{}).Create(&Cause_3)
	Contact_1 := Contact{
		Contact: "Promtpay ",
		Times:   "7 วัน",
	}
	db.Model(&Contact{}).Create(&Contact_1)
	Contact_2 := Contact{
		Contact: "เงินสด",
		Times:   "14 วัน",
	}
	db.Model(&Contact{}).Create(&Contact_2)
	Contact_3 := Contact{
		Contact: "wallet",
		Times:   "10 วัน",
	}
	db.Model(&Contact{}).Create(&Contact_3)

	// ============== Mockup ตาราง Refund ของฟิวส์ ===================================

	//Admin
	passwordAdmin, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)
	admin1 := Admin{
		Name:     "วทัญญ์ ปราศรัย",
		ID_card:  "1-1111-11111-11-1",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    "0444444444",
		Email:    "admin1@example.com",
		Password: string(passwordAdmin),
		ROLE:     admin,
	}
	db.Model(&Admin{}).Create(&admin1)
	admin2 := Admin{
		Name:     "ภานุพงศ์ แคนอินทร์",
		ID_card:  "2-2222-22222-22-2",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    "0444444444",
		Email:    "admin2@example.com",
		Password: string(passwordAdmin),
		ROLE:     admin,
	}
	db.Model(&Admin{}).Create(&admin2)
	admin3 := Admin{
		Name:     "สุภานัน เรืองแสง",
		ID_card:  "3-3333-33333-33-3",
		DOB:      time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:    "0444444444",
		Email:    "admin3@example.com",
		Password: string(passwordAdmin),
		ROLE:     admin,
	}
	db.Model(&Admin{}).Create(&admin3)

	////////////////////////////////////////////////////////////////////////////////////////////////////////

}
