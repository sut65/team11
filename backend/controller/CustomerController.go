package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"golang.org/x/crypto/bcrypt"
)

//GET /Gender
// List all Gender
func ListGender(c *gin.Context){
	var genders []entity.Gender
	if err := entity.DB().Raw("SELECT * FROM genders").Scan(&genders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genders})
}

//GET /Career
// List all Career
func ListCareer(c *gin.Context){
	var careers []entity.Career
	if err := entity.DB().Raw("SELECT * FROM careers").Scan(&careers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": careers})
}

//GET /Prefix
// List all Prefix
func ListPrefix(c *gin.Context){
	var prefixs []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM prefixes").Scan(&prefixs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prefixs})
}


//GET /customer
// List all Customer
func ListCustomer(c *gin.Context){
	var customers []entity.Customer
	if err := entity.DB().Preload("GENDER").Preload("CAREER").Preload("PREFIX").Raw("SELECT * FROM customers").Find(&customers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customers})
}

//GET /customer/:id
//Get customer by id
func GetCustomer(c *gin.Context){
	var customer entity.Customer
	id := c.Param("id")
	if tx := entity.DB().Preload("GENDER").Preload("CAREER").Preload("PREFIX").Preload("ROLE").Where("id = ?", id).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": customer})
}

//PATCH /customer
func UpdateCustomer(c *gin.Context){
	var Customer entity.Customer

	if err := c.ShouldBindJSON(&Customer); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Model(Customer).Where("id = ?", Customer.ID).Updates(map[string]interface{}{"Name": Customer.Name, "CAREER_ID": Customer.CAREER_ID, "Phone": Customer.Phone}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Customer})
}

// DELETE /customer
func DeleteCustomer(c *gin.Context) {
	var customer entity.Customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM customers WHERE id = ?",customer.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "customer not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}


//POST /create customer
func CreateCustomer(c *gin.Context){
	var gender entity.Gender
	var career entity.Career
	var prefix entity.Prefix
	var customer entity.Customer

	// bind เข้าตัวแปร customer
	if err := c.ShouldBindJSON(&customer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error":err.Error()})
		return
	}

	//  ค้นหา gender ด้วย id
    if tx := entity.DB().Where("id = ?", customer.GENDER_ID).First(&gender); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
    	return
    }

    //  ค้นหา career ด้วย id
    if tx := entity.DB().Where("id = ?", customer.CAREER_ID).First(&career); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "career not found"})
    	return
    }

    //  ค้นหา prefix ด้วย id
    if tx := entity.DB().Where("id = ?", customer.PREFIX_ID).First(&prefix); tx.RowsAffected == 0 {
    	c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
    	return
    }

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(customer.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	//กำหนด Role ตอนสร้าง
	role := uint(1)

    //  สร้าง Customer
    viewCS := entity.Customer{
    	Name:      		customer.Name,            // ตั้งค่าฟิลด์ Name
    	ID_card:        customer.ID_card,        // ตั้งค่าฟิลด์ ID_card
    	DOB:            customer.DOB,           // ตั้งค่าฟิลด์ DOB
    	Phone: 			customer.Phone,    	   // ตั้งค่าฟิลด์ Phone
		GENDER_ID: 		customer.GENDER_ID,   // โยงความสัมพันธ์กับ Entity Gender
		CAREER_ID: 		customer.CAREER_ID,  // โยงความสัมพันธ์กับ Entity Career
		PREFIX_ID: 		customer.PREFIX_ID, // โยงความสัมพันธ์กับ Entity Prefix
		Email: 			customer.Email,    // ตั้งค่าฟิลด์ Email
		Password: 		string(hashPassword) ,// ตั้งค่าฟิลด์ Password
		ROLE_ID: 		&role,
    }

    //  บันทึก
    if err := entity.DB().Create(&viewCS).Error; err != nil {
    	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
    	return
    }
    c.JSON(http.StatusOK, gin.H{"data": viewCS})
}

