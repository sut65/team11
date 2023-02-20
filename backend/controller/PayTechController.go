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
	HardwareName string
	Name         string
}

type extendedOrderTechStatus struct {
	entity.OrderTech
	Name       string
	Cost       int
	DamageName string
	StatusName string
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

// getByUID
// หน้า table Tach pay normal want if press comfirm then normal page ordertech_id = ? disappear when for_payment_just = 1
func ListTechnicianByUID(c *gin.Context) {

	var paytech []extendedPayTech
	id := c.Param("id")
	// if err := entity.DB().Preload("Hardware").Preload("Technician").Raw("SELECT p.*, t.name, h.hardware_name FROM pay_teches p JOIN technicians t JOIN hardwares h ON p.technician_id = t.id AND p.hardware_id = h.id WHERE t.id = ?", id).Find(&paytech).Error; err != nil {

	if err := entity.DB().Preload("Hardware").Preload("Technician").Raw("SELECT p.*, t.name, h.hardware_name ,o.for_payment_status FROM pay_teches p JOIN technicians t JOIN hardwares h JOIN order_teches o ON p.technician_id = t.id AND p.hardware_id = h.id AND p.order_tech_id= o.id WHERE for_payment_status = 0 AND t.id = ?", id).Find(&paytech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paytech})

}

// getByUID popup fix status=2 and technician = ? and for_payment_status_of _just = 0 pass
func ListTechnicianOrderStatusByUID(c *gin.Context) {

	var ordertech []extendedOrderTechStatus
	id := c.Param("id")

	if err := entity.DB().Preload("CostDetail").Preload("Damage").Preload("Status").Preload("Technician").Raw("SELECT o.*, t.name, s.status_name,c.cost,d.damage_name FROM order_teches o JOIN statuses s JOIN cost_details c JOIN technicians t JOIN damages d ON o.technician_id = t.id AND o.status_id = s.id AND o.cost_detail_id = c.id AND o.damage_id = d.id WHERE s.id = 2 AND for_payment_status = 0 AND  t.id = ?", id).Find(&ordertech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ordertech})

}

// getByUID table in create fix orderTech_id = ?
func ListTechnicianOrderTechInPayByUID(c *gin.Context) {

	var paytech []extendedPayTech
	id := c.Param("id")

	if err := entity.DB().Preload("Hardware").Preload("Technician").Raw("SELECT p.*, t.name, h.hardware_name FROM pay_teches p JOIN technicians t JOIN hardwares h ON p.technician_id = t.id AND p.hardware_id = h.id WHERE order_tech_id = ?", id).Find(&paytech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paytech})

}

// getByUID table in edit fix paytech_id=?
func ListTechnicianPayTechInEditByUID(c *gin.Context) {

	var paytech []extendedPayTech
	id := c.Param("id")

	if err := entity.DB().Preload("Hardware").Preload("Technician").Raw("SELECT p.*, t.name, h.hardware_name FROM pay_teches p JOIN technicians t JOIN hardwares h ON p.technician_id = t.id AND p.hardware_id = h.id WHERE p.id = ?", id).Find(&paytech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paytech})

}

// ===================================================================
func Update_odertech_status_for_Just(c *gin.Context) {
	id := c.Param("id")
	entity.DB().Table("order_teches").Where("id = ?", id).Updates(map[string]interface{}{"for_Payment_status": 1})
}

// ===================================================================
func Update_odertech_status_for_Few(c *gin.Context) {
	id := c.Param("id")
	entity.DB().Table("ORDERS").Where("id = ?", id).Updates(map[string]interface{}{"state_id": 5})
}

// GET /OrderTech/:id
// Get OrderTech by id
func GetOrderTechForPay(c *gin.Context) {
	var OrderTech entity.PayTech
	id := c.Param("id")
	if tx := entity.DB().Preload("OrderTech.ORDER").Raw("SELECT p.* , o.limits ,ot.solving,ot.time_out FROM pay_teches p JOIN order_teches ot ON p.order_tech_id = ot.id JOIN orders o ON o.id = ot.order_id WHERE p.id = ?", id).Find(&OrderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "PayTech not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTech})
}
