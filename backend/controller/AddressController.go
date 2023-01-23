package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"net/http"
)

// POST AddressType
func CreateAddressType(c *gin.Context) {
	var addressType entity.AddressType
	if err := c.ShouldBindJSON(&addressType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&addressType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": addressType})
}

// POST Province
func CreateProvince(c *gin.Context) {
	var province entity.Province
	if err := c.ShouldBindJSON(&province); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&province).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": province})
}

// POST District
func CreateDistrict(c *gin.Context) {
	var district entity.District
	if err := c.ShouldBindJSON(&district); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}

// POST Tambon
func CreateTambon(c *gin.Context) {
	var tambon entity.Tambon
	if err := c.ShouldBindJSON(&tambon); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&tambon).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tambon})
}

// Main Table Address
func CreateAddress(c *gin.Context) {

	var customer entity.Customer
	var addressType entity.AddressType
	var tambon entity.Tambon
	var address entity.Address

	// ผลลัพธ์ที่ได้จะถูก bind เข้าตัวแปร Address
	if err := c.ShouldBindJSON(&address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา AddressType  ด้วย id
	if tx := entity.DB().Where("id = ?", address.AddressTypeID).First(&addressType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "AddressType not found"})
		return
	}

	// ค้นหา Tambon ด้วย id
	if tx := entity.DB().Where("id = ?", address.TambonID).First(&tambon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tambon not found"})
		return
	}

	// ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", address.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	ad := entity.Address{
		CustomerID  :           	address.CustomerID  , // โยงความสัมพันธ์กับ Entity Customer
		AddressTypeID:     			address.AddressTypeID, // โยงความสัมพันธ์กับ Entity AddressType
		TambonID:      				address.TambonID, // โยงความสัมพันธ์กับ Entity Tambon
		Post_Code: 					address.Post_Code,
		Detail:  					address.Detail,
		Record_Time:                address.Record_Time, // ตั้งค่าฟิลด์ Record_Time
	}

	if err := entity.DB().Create(&ad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ad})
}

// GET /Address
func GetListAddress(c *gin.Context) {
	var addresses []entity.Address
	if err := entity.DB().Preload("Customer").Preload("AddressType").Preload("Tambon").Preload("Tambon.District").Preload("Tambon.District.Province").Preload("Post_Code").Preload("Detail").Preload("Record_Time").Find(&addresses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": addresses})
}

// GET /Address:id
func GetAddress(c *gin.Context) {
	var address entity.Address
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM addresses WHERE id = ?", id).Scan(&address).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	}
	c.JSON(http.StatusOK, gin.H{"data": address})
}

// PATCH /Address
func UpdateAddress(c *gin.Context) {
	var address entity.Address
	if err := c.ShouldBindJSON(&address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", address.ID).First(&address); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
		return
	}

	if err := entity.DB().Save(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": address})
}

// DELETE /Address
func DeleteAddress(c *gin.Context) {
	var address entity.Address
	if err := c.ShouldBindJSON(&address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM addresses WHERE id = ?",address.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}