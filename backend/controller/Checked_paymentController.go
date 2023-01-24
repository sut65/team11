package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller Checked_payment    		////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST /Checked_payment
func CreateChecked_payment(c *gin.Context) {
	var User entity.User
	var Checked_payment entity.Checked_payment
	var Status_check entity.Checked_payment
	var Payment entity.Payment

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ * จะถูก bind เข้าตัวแปร Checked_payment
	if err := c.ShouldBindJSON(&Checked_payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// *: ค้นหา Payment ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.ID).First(&Payment); tx.RowsAffected == 0 { //งงอยู่++++++++++++++++++++++++++++++++++
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not find"})
		return
	}

	// *: ค้นหา Status_check ด้วย id
	if tx := entity.DB().Where("id = ?", Checked_payment.Status_check).First(&Status_check); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status_check not found"})
		return
	}

	// *: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Checked_payment.CustomerID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// *: สร้าง Payment
	pm := entity.Checked_payment{
		Payment_ID: Checked_payment.Payment_ID, // โยงความสัมพันธ์กับ Entity Payment
		Status_ID:  Checked_payment.Status_ID,  // โยงความสัมพันธ์กับ Entity Status Check
		Date_time:  Checked_payment.Date_time,
		Other:      Checked_payment.Other,
		CustomerID: Checked_payment.CustomerID, // โยงความสัมพันธ์กับ Entity Customer
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

}

// GET /Device
func ListChecked_payment(c *gin.Context) {
	var Checked_payment []entity.Checked_payment
	if err := entity.DB().Preload("Customer").Preload("Status_check").Preload("Payment.PayTech.OrderTech.ORDER").Preload("Payment.PayTech.Hardware").Find(&Checked_payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Checked_payment})
}

// GET /Checked_payment/:id
// Get Checked_payment by id
func GetChecked_payment(c *gin.Context) {
	var Checked_payment entity.Checked_payment
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&Checked_payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Checked_payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Checked_payment})
}

// PATCH /Checked_payment
func UpdateChecked_payment(c *gin.Context) {
	var Checked_payment entity.Checked_payment
	if err := c.ShouldBindJSON(&Checked_payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Checked_payment.ID).First(&Checked_payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Checked_payment not found"})
		return
	}

	if err := entity.DB().Save(&Checked_payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Checked_payment})
}

// DELETE /Checked_payment/:id
func DeleteChecked_payment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Checked_payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Checked_payment not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////   		   controller Status_check    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST/Bank  สำหรับ สร้างข้อมูล
func CreateStatus_check(c *gin.Context) {
	var Status_check entity.Checked_payment
	if err := c.ShouldBindJSON(&Status_check); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Status_check).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Status_check})
}

// GET /Status_check
// List all Status_check
func ListStatus_check(c *gin.Context) {
	var Status_check []entity.Status_check
	if err := entity.DB().Raw("SELECT * FROM Status_checks").Scan(&Status_check).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Status_check})
}

// GET /Status_check/:id
// Get Status_check by id
func GetStatus_check(c *gin.Context) {
	var Status_check entity.Status_check
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&Status_check); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status_check not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Status_check})
}

// PATCH /Bank
func UpdateStatus_check(c *gin.Context) {
	var Status_check entity.Status_check
	if err := c.ShouldBindJSON(&Status_check); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Status_check.ID).First(&Status_check); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status_check not found"})
		return
	}

	if err := entity.DB().Save(&Status_check).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Status_check})
}

// DELETE /Status_check/:id
func DeleteStatus_check(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Status_checks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status_check not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
