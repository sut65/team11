package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"golang.org/x/crypto/bcrypt"

	"github.com/asaskevich/govalidator"
)

//GET /Gender
// List all Gender
func ListGenderT(c *gin.Context){
	var genders []entity.GenderT
	if err := entity.DB().Raw("SELECT * FROM gender_ts").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

//GET /Educate
// List all Educate
func ListEducate(c *gin.Context){
	var educates []entity.Educate
	if err := entity.DB().Raw("SELECT * FROM educates").Scan(&educates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": educates})
}

//GET /Prefix
// List all Prefix
func ListPrefixT(c *gin.Context){
	var prefixs []entity.PrefixT
	if err := entity.DB().Raw("SELECT * FROM prefix_ts").Scan(&prefixs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prefixs})
}

//GET /Technician
// List all Technician
func ListTechnician(c *gin.Context){
	var technicians []entity.Technician
	if err := entity.DB().Preload("GENDER").Preload("EDUCATE").Preload("PREFIX").Raw("SELECT * FROM technicians").Find(&technicians).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": technicians})
}

//GET /customer/:id
//Get customer by id
func GetTechnician(c *gin.Context){
	var technician entity.Technician
	id := c.Param("id")
	if tx := entity.DB().Preload("GENDER").Preload("EDUCATE").Preload("PREFIX").Where("id = ?", id).First(&technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": technician})
}

//PATCH /technician
func UpdateTechnician(c *gin.Context){
	var technician entity.Technician

	if err := c.ShouldBindJSON(&technician); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Model(technician).Where("id = ?", technician.ID).Updates(map[string]interface{}{"Name": technician.Name, "Phone": technician.Phone, "Location": technician.Location}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": technician})
}

// DELETE /technician
func DeleteTechnician(c *gin.Context) {
	var technician entity.Technician
	if err := c.ShouldBindJSON(&technician); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM technicians WHERE id = ?",technician.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}

//POST /technician
func CreateTechnician(c *gin.Context){
	var gender entity.GenderT
	var educate entity.Educate
	var prefix entity.PrefixT
	var technician entity.Technician

	// bind เข้าตัวแปร technician
	if err := c.ShouldBindJSON(&technician); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	//  ค้นหา gender ด้วย id
    if tx := entity.DB().Where("id = ?", technician.GENDER_ID).First(&gender); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
    	return
    }

    //  ค้นหา educate ด้วย id
    if tx := entity.DB().Where("id = ?", technician.EDUCATE_ID).First(&educate); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "educate not found"})
    	return
    }

    //  ค้นหา prefix ด้วย id
    if tx := entity.DB().Where("id = ?", technician.PREFIX_ID).First(&prefix); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
    	return
    }

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(technician); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(technician.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	//กำหนด Role ตอนสร้าง
	role := uint(2)


    //  สร้าง Technician
    viewTC := entity.Technician{
    	Name:      		technician.Name,            // ตั้งค่าฟิลด์ Name
    	ID_card:        technician.ID_card,        // ตั้งค่าฟิลด์ ID_card
    	DOB:            technician.DOB,           // ตั้งค่าฟิลด์ DOB
    	Phone: 			technician.Phone,    	   // ตั้งค่าฟิลด์ Phone
		GENDER_ID: 		technician.GENDER_ID,   // โยงความสัมพันธ์กับ Entity Gender
		EDUCATE_ID: 	technician.EDUCATE_ID,  // โยงความสัมพันธ์กับ Entity educate
		PREFIX_ID: 		technician.PREFIX_ID, // โยงความสัมพันธ์กับ Entity Prefix
		Location:		technician.Location,// ตั้งค่าฟิลด์ Location
		Username: 		technician.Username,    // ตั้งค่าฟิลด์ Username
		Password: 		string(hashPassword) ,// ตั้งค่าฟิลด์ Password
		ROLE_ID: 		&role,
    }

    //  บันทึก
    if err := entity.DB().Create(&viewTC).Error; err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    	return
    }
    c.JSON(http.StatusOK, gin.H{"data": viewTC})
}

