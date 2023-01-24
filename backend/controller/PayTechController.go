package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"gorm.io/gorm/clause"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller PayTech    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST /PayTech
func CreatePayTech(c *gin.Context) {
	var Hardware entity.Hardware
	var PayTech entity.PayTech
	// var Type entity.Type
	var technician entity.Technician
	var OrderTech entity.OrderTech

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร PayTech
	if err := c.ShouldBindJSON(&PayTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา Hardware ด้วย id
	if tx := entity.DB().Where("id = ?", PayTech.HardwareID).First(&Hardware); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hardware not found"})
		return
	}

	// 12: ค้นหา OrderTech ด้วย id
	if tx := entity.DB().Where("id = ?", PayTech.OrderTechID).First(&OrderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ordertech not found"})
		return
	}

	// 14: ค้นหา technician ด้วย id
	if tx := entity.DB().Where("id = ?", PayTech.TechnicianID).First(&technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician not found"})
		return
	}

	// 15: สร้าง PayTech
	pm := entity.PayTech{
		OrderTech:  OrderTech,  // โยงความสัมพันธ์กับ Entity OrderTech
		Hardware:   Hardware,   // โยงความสัมพันธ์กับ Entity Hardware
		Technician: technician, // โยงความสัมพันธ์กับ Entity Technician

		Note: PayTech.Note,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

}

func ListPayTech(c *gin.Context) {
	var PayTeches []entity.PayTech
	if err := entity.DB().Preload("OrderTech").Preload("Hardware").Preload("Technician").Find(&PayTeches).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": PayTeches})
}

// GET /PayTech/:id
// Get PayTech by id
func GetPayTech(c *gin.Context) {
	var PayTech entity.PayTech
	id := c.Param("id")
	if tx := entity.DB().Preload(clause.Associations).Where("id = ?", id).First(&PayTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paytech not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": PayTech})
}

// PATCH /PayTech
func UpdatePayTech(c *gin.Context) {
	var PayTech entity.PayTech
	var newPayTech entity.PayTech

	if err := c.ShouldBindJSON(&PayTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newPayTech.Note = PayTech.Note
	newPayTech.HardwareID = PayTech.HardwareID


	if err := entity.DB().Where("id = ?", PayTech.ID).Updates(&newPayTech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newPayTech})
}

// DELETE /PayTech
func DeletePayTech(c *gin.Context) {
	id := c.Param("id")

	if tx := entity.DB().Exec("DELETE FROM pay_teches WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "blog not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////   		   controller Hardware    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /Hardware
// List all Hardware
func ListHardware(c *gin.Context) {
	var Hardwares []entity.Hardware
	if err := entity.DB().Raw("SELECT * FROM Hardwares").Scan(&Hardwares).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Hardwares})
}

// GET /Hardware/:id
// Get Hardware by id
func GetHardware(c *gin.Context) {
	var Hardware entity.Hardware
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&Hardware); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hardware not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Hardware})
}
