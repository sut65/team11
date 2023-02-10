package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller PayTech    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type extendedPayTech struct {
	entity.PayTech
	Name string
}

// POST /PayTech
func CreatePayTech(c *gin.Context) {
	var Hardware entity.Hardware
	var PayTech entity.PayTech
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
		Model:      gorm.Model{ID: PayTech.ID},
		OrderTech:  OrderTech,  // โยงความสัมพันธ์กับ Entity OrderTech
		Hardware:   Hardware,   // โยงความสัมพันธ์กับ Entity Hardware
		Technician: technician, // โยงความสัมพันธ์กับ Entity Technician

		Note:         PayTech.Note,
		Amount:       PayTech.Amount,
		CostHardware: PayTech.CostHardware,
	}

	
	if _, err := govalidator.ValidateStruct(pm); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

}

func ListPayTech(c *gin.Context) {
	var PayTeches []extendedPayTech
	if err := entity.DB().Preload("OrderTech.ORDER.Device.Type").Preload("OrderTech.ORDER.Customer").Preload("Hardware").Preload("Technician").Raw("SELECT pt.* , t.name, h.hardware_name FROM pay_teches pt JOIN technicians t JOIN hardwares h JOIN order_teches o ON pt.technician_id = t.id AND pt.hardware_id = h.id AND pt.order_tech_id = o.id").Find(&PayTeches).Error; err != nil {
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

// update new

// PATCH /users
func UpdatePayTech(c *gin.Context) {
	var payTech entity.PayTech
	var hardWare entity.Hardware
	var technician entity.Technician
	var orderTech entity.OrderTech

	if err := c.ShouldBindJSON(&payTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var upNote = payTech.Note
	var upAmount = payTech.Amount
	var upCostHardware = payTech.CostHardware



	if tx := entity.DB().Where("id = ?", payTech.HardwareID).First(&hardWare); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "hardware not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payTech.TechnicianID).First(&technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician tech not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payTech.OrderTechID).First(&orderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "orderTech not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payTech.ID).First(&payTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "pay tech not found"})
		return
	}

	up_pt := entity.PayTech{
		Model:        gorm.Model{ID: payTech.ID},
		Hardware:     hardWare,
		Technician:   technician,
		OrderTech:    orderTech,
		Note:         upNote,
		Amount:       upAmount,
		CostHardware: upCostHardware,

	}

	if _, err := govalidator.ValidateStruct(up_pt); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&up_pt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": up_pt})
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
