package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"gorm.io/gorm"
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////   		   controller OrderTech    		////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type extendedOrderTech struct {
	entity.OrderTech
	Name string
}

type extendedOrderTechCus struct {
	entity.OrderTech
	limits uint
	Name   string
}

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
		Model:      gorm.Model{ID: OrderTech.ID},
		ORDER:      ORDER,
		CostDetail: CostDetail, // โยงความสัมพันธ์กับ Entity CostDetail
		Damage:     Damage,     // โยงความสัมพันธ์กับ Entity Damage
		Status:     Status,     // โยงความสัมพันธ์กับ Entity Status
		Technician: technician, // โยงความสัมพันธ์กับ Entity Technician
		Solving:    OrderTech.Solving,
		TimeOut:    OrderTech.TimeOut,

		ForPaymentStatus: OrderTech.ForPaymentStatus, //จั๊ดเป็นคนเพิ่ม ใช้ในระบบจั๊ด
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

// GET /OrderTech
// List all OrderTechs
func ListOrderTechs(c *gin.Context) {
	var OrderTechs []extendedOrderTech
	// if err := entity.DB().Raw("SELECT ot.* , t.name, s.status_name, d.damage_name,c.cost FROM order_teches ot JOIN technicians t JOIN statuses s JOIN cost_details c JOIN damages d ON ot.technician_id = t.id AND ot.status_id = s.id AND ot.cost_detail_id = c.id AND ot.damage_id = d.id").Find(&OrderTechs).Error; err != nil {
	if err := entity.DB().Preload("ORDER.CASE").Preload("ORDER.Address.AddressType").Preload("ORDER.Device.Windows").Preload("ORDER.Device.Type").Preload("ORDER.Device.Customer.GENDER").Preload("ORDER.Device.Customer.CAREER").Preload("ORDER.Device.Customer.PREFIX").Preload("Technician.EDUCATE").Preload("Technician.PREFIX").Preload("ORDER.Address.Tambon.District.Province").Preload("ORDER.Device.Windows").Preload("ORDER.Device.Type").Preload("ORDER.Device.Customer.GENDER").Preload("ORDER.Device.Customer.CAREER").Preload("ORDER.Device.Customer.PREFIX").Preload("Technician.GENDER").Preload("CostDetail").Preload("Damage").Preload("Status").Raw("SELECT ot.* , t.name, s.status_name, d.damage_name,c.cost FROM order_teches ot JOIN technicians t JOIN statuses s JOIN cost_details c JOIN damages d ON ot.technician_id = t.id AND ot.status_id = s.id AND ot.cost_detail_id = c.id AND ot.damage_id = d.id").Find(&OrderTechs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTechs})
}

// GET /OrderTech/:id
// Get OrderTech by id
func GetOrderTech(c *gin.Context) {
	var OrderTech extendedOrderTechCus
	id := c.Param("id")
	if tx := entity.DB().Raw("SELECT ot.* , t.name, s.status_name, o.limits , d.damage_name,c.cost FROM order_teches ot JOIN technicians t JOIN orders o JOIN statuses s JOIN cost_details c JOIN damages d ON ot.technician_id = t.id AND ot.order_id = o.id AND ot.status_id = s.id AND ot.cost_detail_id = c.id AND ot.damage_id = d.id WHERE ot.id = ?", id).First(&OrderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OrderTech not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTech})
}

func GetOrderTechcus(c *gin.Context) {
	var OrderTech []extendedOrderTechCus
	id := c.Param("id")
	if tx := entity.DB().Raw("SELECT ot.*, c.name FROM order_teches ot JOIN orders o ON ot.order_id = o.id JOIN customers c ON o.customer_id = c.id WHERE ot.id = ?", id).First(&OrderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OrderTech not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": OrderTech})
}


// PATCH /users
func UpdateOrderTech(c *gin.Context) {
	var orderTech entity.OrderTech
	var status entity.Status
	var damage entity.Damage
	var costDetail entity.CostDetail
	var order entity.ORDER
	var technician entity.Technician

	if err := c.ShouldBindJSON(&orderTech); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var upSolving = orderTech.Solving
	var upTimeOut = orderTech.TimeOut

	if tx := entity.DB().Where("id = ?", orderTech.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", orderTech.DamageID).First(&damage); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "damage tech not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", orderTech.CostDetailID).First(&costDetail); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "costDetail not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", orderTech.OrderID).First(&order); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order tech not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", orderTech.TechnicianID).First(&technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "technician not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", orderTech.ID).First(&orderTech); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "order tech not found"})
		return
	}

	up_pt := entity.OrderTech{
		Model:      gorm.Model{ID: orderTech.ID},
		Status:     status,
		Damage:     damage,
		CostDetail: costDetail,
		ORDER:      order,
		Technician: technician,
		Solving:    upSolving,
		TimeOut:    upTimeOut,
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
