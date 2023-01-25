package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////   		   controller Payment    		////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST /Payment
func CreatePayment(c *gin.Context) {
	var Customer entity.Customer
	var Payment entity.Payment
	var Bank entity.Bank
	var PAYTECH entity.PayTech
	var vat_pay float32 = 0.25

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Payment
	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา PAYTECH ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.PayTech_ID).First(&PAYTECH); tx.RowsAffected == 0 { //งงอยู่++++++++++++++++++++++++++++++++++
		c.JSON(http.StatusBadRequest, gin.H{"error": "PAYTECH not found"})
		return
	}

	// 10: ค้นหา Bank ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.Bank_ID).First(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank not found"})
		return
	}

	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.CustomerID).First(&Customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	//ค้นหาและคำนวนค่า Amount check

	// 12: สร้าง Payment
	pm := entity.Payment{
		PayTech_ID:   Payment.PayTech_ID, // โยงความสัมพันธ์กับ Entity PAYTECH
		Sender_Name:  Payment.Sender_Name,
		Bank_ID:      Payment.Bank_ID, // โยงความสัมพันธ์กับ Entity Bank
		Amount:       Payment.Amount,
		Amount_Check: float32(Payment.Amount_Check + (Payment.Amount_Check * vat_pay)),
		Date_time:    Payment.Date_time,
		Status_ID:    Payment.Status_ID,
		CustomerID:   Payment.CustomerID, // โยงความสัมพันธ์กับ
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

}

// GET /Review
func ListPayments(c *gin.Context) {
	var Payments []entity.Payment
	if err := entity.DB().Preload("PayTech.Hardware").Preload("PayTech.OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&Payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payments})
}

// GET /payment/:id
// Get payment by id
func GetPayment(c *gin.Context) {
	var Payment entity.Payment
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&Payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Payment})
}

// PATCH /UpdatePayment
func UpdatePayment(c *gin.Context) {
	var UpdatePayment entity.Payment

	if err := c.ShouldBindJSON(&UpdatePayment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(UpdatePayment).Where("id = ?", UpdatePayment.ID).Updates(map[string]interface{}{"Sender_Name": UpdatePayment.Sender_Name, "Bank_ID": UpdatePayment.Bank_ID, "Amount": UpdatePayment.Amount, "Date_time": UpdatePayment.Date_time}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": UpdatePayment})
}

// DELETE /payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Payments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment not found"})
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
//////////////////////////////////////////////////   		   controller Bank    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST/Bank  สำหรับ สร้างข้อมูล
func CreateBank(c *gin.Context) {
	var Bank entity.Bank
	if err := c.ShouldBindJSON(&Bank); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Bank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Bank})
}

// GET /Bank
// List all Bank
func ListBank(c *gin.Context) {
	var Banks []entity.Bank
	if err := entity.DB().Raw("SELECT * FROM Banks").Scan(&Banks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Banks})
}

// GET /Bank/:id
// Get Bank by id
func GetBank(c *gin.Context) {
	var Bank entity.Bank
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Bank})
}

// PATCH /Bank
func UpdateBank(c *gin.Context) {
	var Bank entity.Bank
	if err := c.ShouldBindJSON(&Bank); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", Bank.ID).First(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank not found"})
		return
	}

	if err := entity.DB().Save(&Bank).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Bank})
}

// DELETE /Bank/:id
func DeleteBank(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM Banks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
