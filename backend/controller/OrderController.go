package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

// POST CASE
func CreateCASE(c *gin.Context) {
	var cased entity.CASE
	if err := c.ShouldBindJSON(&cased); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&cased).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cased})
}

// List all Case
func ListCase(c *gin.Context) {
	var cases []entity.CASE
	if err := entity.DB().Raw("SELECT * FROM cases").Scan(&cases).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cases})
}

// Get Case by id
func GetCase(c *gin.Context) {
	var GetCase entity.CASE
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).Find(&GetCase); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bank not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": GetCase})
}

// Main Table ORDER
func CreateOrder(c *gin.Context) {

	var cased entity.CASE
	var device entity.Device
	var address entity.Address
	var customer entity.Customer
	var order entity.ORDER

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร Order
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา cased  ด้วย id
	if tx := entity.DB().Where("id = ?", order.CASEID).First(&cased); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Case not found"})
		return
	}

	// ค้นหา device ด้วย id
	if tx := entity.DB().Where("id = ?", order.DeviceID).First(&device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Device not found"})
		return
	}

	// ค้นหา address ด้วย id
	if tx := entity.DB().Where("id = ?", order.AddressID).First(&address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
		return
	}

	// ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", order.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	ad := entity.ORDER{
		CASEID:     order.CASEID,     // โยงความสัมพันธ์กับ Entity Case
		DeviceID:   order.DeviceID,   // โยงความสัมพันธ์กับ Entity Device
		AddressID:  order.AddressID,  // โยงความสัมพันธ์กับ Entity Address
		CustomerID: order.CustomerID, // โยงความสัมพันธ์กับ Entity Customer
		Date_time:  order.Date_time,  // ตั้งค่าฟิลด์ date-time
		Reason:     order.Reason,
		Limit:      order.Limit,
	}

	if err := entity.DB().Create(&ad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ad})
}

// GET /ORDER
func GetListOrder(c *gin.Context) {
	var orders []entity.ORDER
	if err := entity.DB().Preload("Customer").Preload("Device").Preload("Address").Preload("CASE").Find(&orders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": orders})
}

// GET /Order:id
func GetOrder(c *gin.Context) {
	var order entity.ORDER
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM order WHERE id = ?", id).Scan(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": order})
}

// PATCH /Order
func UpdateOrder(c *gin.Context) {
	var order entity.ORDER
	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", order.ID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
		return
	}

	if err := entity.DB().Save(&order).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": order})
}
