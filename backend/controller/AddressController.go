package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

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

func GetListAddressType(c *gin.Context) {
	var addressType []entity.AddressType
	if err := entity.DB().Raw("SELECT * FROM address_types").Scan(&addressType).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": addressType})
}

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

func GetListProvince(c *gin.Context) {
	var provinces []entity.Province
	if err := entity.DB().Raw("SELECT * FROM provinces").Scan(&provinces).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": provinces})
}

func GetDistrict(c *gin.Context) {
	var district []entity.District
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM districts WHERE province_id = ?", id).Find(&district).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": district})
}

func GetTambon(c *gin.Context) {
	var tambon []entity.Tambon
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM tambons WHERE district_id = ?", id).Find(&tambon).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tambon})
}

func GetListDistrict(c *gin.Context) {
	var districts []entity.District
	if err := entity.DB().Preload("Province").Find(&districts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": districts})
}

func GetListTambon(c *gin.Context) {
	var tambons []entity.Tambon
	if err := entity.DB().Preload("District.Province").Find(&tambons).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": tambons})
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกประเภทที่อยู่"})
		return
	}

	// ค้นหา Tambon ด้วย id
	if tx := entity.DB().Where("id = ?", address.TambonID).First(&tambon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกตำบล"})
		return
	}

	// ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", address.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	if _, err := govalidator.ValidateStruct(address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ad := entity.Address{
		CustomerID:    address.CustomerID,    // โยงความสัมพันธ์กับ Entity Customer
		AddressTypeID: address.AddressTypeID, // โยงความสัมพันธ์กับ Entity AddressType
		TambonID:      address.TambonID,      // โยงความสัมพันธ์กับ Entity Tambon
		Post_Code:     address.Post_Code,
		Detail:        address.Detail,
		Record_Time:   address.Record_Time, // ตั้งค่าฟิลด์ Record_Time
	}

	if err := entity.DB().Create(&ad).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ad})
}

func GetListAddress(c *gin.Context) {
	var addresses []entity.Address
	if err := entity.DB().Preload("Customer.GENDER").Preload("Customer.CAREER").Preload("Customer.PREFIX").Preload("AddressType").Preload("Tambon").Preload("Tambon.District").Preload("Tambon.District.Province").Find(&addresses).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": addresses})
}

func GetAddressBYcustomerID(c *gin.Context) {
	var address []entity.Address
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM addresses WHERE customer_id = ?", id).Preload("Customer.GENDER").Preload("Customer.CAREER").Preload("Customer.PREFIX").Preload("AddressType").Preload("Tambon").Preload("Tambon.District").Preload("Tambon.District.Province").Find(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": address})
}

func GetAddress(c *gin.Context) {
	var address entity.Address
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM addresses WHERE id = ?", id).Preload("Customer.GENDER").Preload("Customer.CAREER").Preload("Customer.PREFIX").Preload("AddressType").Preload("Tambon").Preload("Tambon.District").Preload("Tambon.District.Province").Find(&address).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": address})
}

func UpdateAddress(c *gin.Context) {
	var address entity.Address
	var addressType entity.AddressType
	var tambon entity.Tambon
	var customer entity.Customer

	if err := c.ShouldBindJSON(&address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", address.AddressTypeID).First(&addressType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกประเภทที่อยู่"})
		return
	}
	if tx := entity.DB().Where("id = ?", address.TambonID).First(&tambon); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกตำบล"})
		return
	}
	if tx := entity.DB().Where("id = ?", address.CustomerID).First(&customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}
	if _, err := govalidator.ValidateStruct(address); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(address).Where("id = ?", address.ID).Updates(map[string]interface{}{"CustomerID": address.CustomerID, "AddressTypeID": address.AddressTypeID, "TambonID": address.TambonID, "Post_Code": address.Post_Code, "Detail": address.Detail, "Record_Time": address.Record_Time}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": address})
}

func DeleteAddress(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM addresses WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Address not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "ID	" + id + "	DELETE SUCCEED!!"})
}
