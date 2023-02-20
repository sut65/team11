package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"github.com/asaskevich/govalidator"
)

// POST Cause
func CreateCause(c *gin.Context) {
	var caused entity.Cause
	if err := c.ShouldBindJSON(&caused); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&caused).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": caused})
}

// List all Cause
func ListCause(c *gin.Context) {
	var causes []entity.Cause
	if err := entity.DB().Raw("SELECT * FROM causes").Scan(&causes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": causes})
}

// Get Cause by id
func GetCause(c *gin.Context) {
	var GetCause entity.Cause
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&GetCause); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cause not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetCause})
}

// POST Contact
func CreateContact(c *gin.Context) {
	var contacted entity.Contact
	if err := c.ShouldBindJSON(&contacted); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&contacted).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": contacted})
}

// List all Case
func ListContact(c *gin.Context) {
	var contacts []entity.Contact
	if err := entity.DB().Raw("SELECT * FROM contacts").Scan(&contacts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": contacts})
}

// Get Case by id
func GetContact(c *gin.Context) {
	var GetContact entity.Contact
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&GetContact); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contact not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetContact})
}

// Main Table Refund
func CreateRefund(c *gin.Context) {

	var order entity.ORDER
	var cause entity.Cause
	var contact entity.Contact
	var refund entity.Refund

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร Refund
	if err := c.ShouldBindJSON(&refund); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา order  ด้วย id
	if tx := entity.DB().Where("id = ?", refund.OrderID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Order not found"})
		return
	}

	// ค้นหา cause  ด้วย id
	if tx := entity.DB().Where("id = ?", refund.CauseID).First(&cause); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cause not found"})
		return
	}

	// ค้นหา contact ด้วย id
	if tx := entity.DB().Where("id = ?", refund.ContactID).First(&contact); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Contact not found"})
		return
	}

	// : แทรกการ validate
	if _, err := govalidator.ValidateStruct(refund); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ad := entity.Refund{
		OrderID: 		refund.OrderID,		
		CauseID:        refund.CauseID,  
		ContactID:      refund.ContactID, 
		Refund_Cause:   refund.Refund_Cause,
		Refund_Contact: refund.Refund_Contact,
		Refund_time:    refund.Refund_time,
	}

	if err := entity.DB().Create(&ad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ad})
}

// GET /Refund
func GetListRefund(c *gin.Context) {
	var refunds []entity.Refund
	if err := entity.DB().Preload("ORDER").Preload("ORDER.Customer").Preload("Cause").Preload("Contact").Find(&refunds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": refunds})
}

// GET /Order:id
func GetRefund(c *gin.Context) {
	var refund entity.Refund
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM refund WHERE id = ?", id).Scan(&refund).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": refund})
}

// DELETE /Address
func DeleteRefund(c *gin.Context) {
	var order entity.ORDER
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM order WHERE id = ?", order.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}
