package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller OrderTech    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// POST /OrderTech
func CreateOrderTech(c *gin.Context) {
	var Status entity.Status
	var Damage entity.Damage
	var CostDetail entity.CostDetail
	var OrderTech entity.OrderTech
	var technician entity.Technician
	var ORDER entity.ORDER

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร OrderTech
	if err := c.ShouldBindJSON(&OrderTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา Status ด้วย id
	if tx := entity.DB().Where("id = ?", OrderTech.StatusID).First(&Status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	// 11: ค้นหา Damage ด้วย id
	if tx := entity.DB().Where("id = ?", OrderTech.DamageID).First(&Damage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "damage not found"})
		return
	}
	// 12: ค้นหา Order ด้วย id
	if tx := entity.DB().Where("id = ?", OrderTech.OrderID).First(&ORDER); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order not found"})
		return
	}

	// 13: ค้นหา CostDetail ด้วย id
	if tx := entity.DB().Where("id = ?", OrderTech.CostDetailID).First(&CostDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cost detail not found"})
		return
	}

	// 14: ค้นหา technician ด้วย id
	if tx := entity.DB().Where("id = ?", OrderTech.TechnicianID).First(&technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician not found"})
		return
	}

	// 15: สร้าง OrderTech
	pm := entity.OrderTech{
		ORDER:      ORDER,
		CostDetail: CostDetail, // โยงความสัมพันธ์กับ Entity CostDetail
		Damage:     Damage,     // โยงความสัมพันธ์กับ Entity Damage
		Status:     Status,     // โยงความสัมพันธ์กับ Entity Status
		Technician: technician, // โยงความสัมพันธ์กับ Entity Technician
		// Reason:     OrderTech.Reason,
		Solving: OrderTech.Solving,
		// Date_time:  ORDER.Date_time,
		TimeOut: OrderTech.TimeOut,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

}

// GET /OrderTech
// List all OrderTechs
func ListOrderTechs(c *gin.Context) {
	var OrderTechs []entity.OrderTech
	if err := entity.DB().Preload("ORDER").Raw("SELECT * FROM order_teches").Find(&OrderTechs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTechs})
}

// GET /OrderTech/:id
// Get OrderTech by id
func GetOrderTech(c *gin.Context) {
	var OrderTech entity.OrderTech
	id := c.Param("id")
	if tx := entity.DB().Preload("id = ?", id).First(&OrderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OrderTech not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTech})
}

// PATCH /OrderTech
func UpdateOrderTech(c *gin.Context) {
	var orderTech entity.OrderTech
	var newOrderTech entity.OrderTech

	if err := c.ShouldBindJSON(&orderTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	newOrderTech.Solving = orderTech.Solving
	newOrderTech.TimeOut = orderTech.TimeOut
	newOrderTech.Status = orderTech.Status
	newOrderTech.Damage = orderTech.Damage
	newOrderTech.CostDetail = orderTech.CostDetail

	if err := entity.DB().Where("id = ?", orderTech.ID).Updates(&newOrderTech).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": newOrderTech})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////   		   controller Status    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /Status
// List all Status
func ListStatus(c *gin.Context) {
	var Status []entity.Status
	if err := entity.DB().Raw("SELECT * FROM Statuses").Scan(&Status).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Status})
}

// GET /Status/:id
// Get Status by id
func GetStatus(c *gin.Context) {
	var Status entity.Status
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&Status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Status})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////   		   controller Damage    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /Damage
// List all Damage
func ListDamage(c *gin.Context) {
	var damages []entity.Damage
	if err := entity.DB().Raw("SELECT * FROM damages").Scan(&damages).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": damages})
}

// GET /Damage/:id
// Get Damage by id
func GetDamage(c *gin.Context) {
	var Damage entity.Damage
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&Damage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Damage not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": Damage})
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////   		   controller CostDetail    		  //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// GET /CostDetail
// List all CostDetail
func ListCostDetail(c *gin.Context) {
	var costDetails []entity.CostDetail
	if err := entity.DB().Raw("SELECT * FROM cost_details").Scan(&costDetails).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": costDetails})
}

// GET /CostDetail/:id
// Get CostDetail by id
func GetCostDetail(c *gin.Context) {
	var CostDetail entity.CostDetail
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&CostDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "CostDetail not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": CostDetail})
}
