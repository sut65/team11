package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

var vat_pay float32 = 0.25

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////   		   controller Payment    		////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// POST /Payment
func CreatePayment(c *gin.Context) {
	var Customer entity.Customer
	var Payment entity.Payment
	var Bank entity.Bank
	var ORDERTECH entity.OrderTech

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Payment
	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา ORDERTECH ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.OrderTech_ID).First(&ORDERTECH); tx.RowsAffected == 0 { //งงอยู่++++++++++++++++++++++++++++++++++
		c.JSON(http.StatusBadRequest, gin.H{"error": "ORDERTECH not found"})
		return
	}

	// 10: ค้นหา Bank ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.Bank_ID).First(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "โปรดตรวจสอบคุณอาจลืม เลือกธนาคาร"})
		return
	}

	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.CustomerID).First(&Customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// : แทรกการ validate
	if _, err := govalidator.ValidateStruct(Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 12: สร้าง Payment
	pm := entity.Payment{

		OrderTech_ID: Payment.OrderTech_ID, // ตัวแปลนี้ จะเก็บค่า Ordertech_ID
		Sender_Name:  Payment.Sender_Name,
		Bank_ID:      Payment.Bank_ID,
		Amount:       Payment.Amount,
		Amount_Check: calculat_backend(Payment.OrderTech_ID), //เอา  ID มาคำนวณทีj
		Date_time:    Payment.Date_time,
		Status_ID:    Payment.Status_ID,
		CustomerID:   Payment.CustomerID,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})

	Update_odertech_status(Payment.OrderTech_ID, 0) //เพื่อไม่ให้โชว์ หน้าสำหรับกดชำระ เพราะชำระแล้ว

}

// ================================================== function List for frontend =================================================
func List_OrderID_in_Paytech(c *gin.Context) {
	var Payments []entity.Payment
	if err := entity.DB().Preload("OrderTech.Hardware").Preload("OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&Payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payments})
}

// List all playmment
func ListPayments(c *gin.Context) {
	var Payments []entity.Payment
	if err := entity.DB().Preload("OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&Payments).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payments})
}

// fn สำหรับ List ข้อมูล payment สถานะเป็น 'รอการตรวจสอบการชำระเงิน' สำหรับ checked payment
func ListPayment_for_Check(c *gin.Context) {
	var Payments_for_check []entity.Payment
	if err := entity.DB().Raw("SELECT * FROM payments WHERE status_id = 3").Preload("OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&Payments_for_check).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payments_for_check})

}

// สำหรับโชว์รายการชำระเงิน ที่ดำเนินการแล้วทั้งหมดของลูกค้า
func ListPayment_filter_by_customer(c *gin.Context) {
	C_id := c.Param("id")
	var ListPayment_filter_by_customer []entity.Payment
	query := "SELECT * FROM payments WHERE customer_id = " + C_id + ";"

	if err := entity.DB().Raw(query).Preload("OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&ListPayment_filter_by_customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ListPayment_filter_by_customer})
}

// ===================================================================================================================================
// GET /payment/:id  // Get payment by id
func GetPayment(c *gin.Context) {
	var Payment entity.Payment
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payments WHERE id = ?", id).Preload("OrderTech.ORDER").Preload("Bank").Preload("Customer").Find(&Payment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Payment})
}

// PATCH /UpdatePayment
func UpdatePayment(c *gin.Context) {
	var Customer entity.Customer
	var Payment entity.Payment
	var Bank entity.Bank

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Payment
	if err := c.ShouldBindJSON(&Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 10: ค้นหา Bank ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.Bank_ID).First(&Bank); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "โปรดตรวจสอบคุณอาจลืม เลือกธนาคาร"})
		return
	}
	// 11: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", Payment.CustomerID).First(&Customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// : แทรกการ validate
	if _, err := govalidator.ValidateStruct(Payment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// 12: สร้าง Payment
	pm := entity.Payment{

		Sender_Name: Payment.Sender_Name,
		Bank_ID:     Payment.Bank_ID,
		Amount:      Payment.Amount,
		Date_time:   Payment.Date_time,
	}

	if err := entity.DB().Model(pm).Where("id = ?", Payment.ID).Updates(&pm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": pm})
}

// DELETE /payment/:id
func DeletePayment(c *gin.Context) {
	id := c.Param("id")
	ordertech_id := get_id_Ordertech_for_status(id)
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
	Update_odertech_status(ordertech_id, 1)
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
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// =========================================== สำหรับ ดึงตารางเหมียวไปโขว์เฉพาะ ที่มีสถานะ เสร็จแล้ว ============================================
func ListOrderTechForPaymment(c *gin.Context) {
	C_id := c.Param("id")
	var ListOrderTechForPaymment []entity.OrderTech
	query := "SELECT * FROM order_teches WHERE for_Payment_status = 1 AND order_teches.order_id IN (SELECT id FROM orders WHERE customer_id = " + C_id + ");"

	if err := entity.DB().Raw(query).Preload("ORDER.CASE").Preload("ORDER.Address.AddressType").Preload("ORDER.Device.Windows").Preload("ORDER.Device.Type").Preload("ORDER.Device.Customer.GENDER").Preload("ORDER.Device.Customer.CAREER").Preload("ORDER.Device.Customer.PREFIX").Preload("Technician.EDUCATE").Preload("Technician.PREFIX").Preload("ORDER.Address.Tambon.District.Province").Preload("ORDER.Device.Windows").Preload("ORDER.Device.Type").Preload("ORDER.Device.Customer.GENDER").Preload("ORDER.Device.Customer.CAREER").Preload("ORDER.Device.Customer.PREFIX").Preload("Technician.GENDER").Preload("CostDetail").Preload("Damage").Preload("Status").Find(&ListOrderTechForPaymment).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ListOrderTechForPaymment})
}

//=========================================== สำหรับการคำนวณ ============================================================================

func SendmoneyToFrontend(c *gin.Context) {
	id := c.Param("id")
	//เงินค่าช่าง
	var A float32
	entity.DB().Table("cost_details").Select("cost").
		Where("id = (SELECT cost_detail_id FROM order_teches where id = ?);", id).Row().Scan(&A)
	//เงินจากรายการอุปกรณ์ทั้งหมดที่ใช้ซ่อม
	var B float32
	entity.DB().Table("pay_teches").Select("sum(amount * cost_hardware)").
		Where("order_tech_id = ?", id).Row().Scan(&B)

	var A_B = A + B
	var sent = A_B + (A_B * vat_pay)

	c.JSON(http.StatusOK, gin.H{"sent": sent})

}

func calculat_backend(id any) float32 {
	//เงินค่าช่าง
	var A float32
	entity.DB().Table("cost_details").Select("cost").
		Where("id = (SELECT cost_detail_id FROM order_teches where id = ?);", id).Row().Scan(&A)
	//เงินจากรายการอุปกรณ์ทั้งหมดที่ใช้ซ่อม
	var B float32
	entity.DB().Table("pay_teches").Select("sum(amount * cost_hardware)").
		Where("order_tech_id = ?", id).Row().Scan(&B)

	var A_B = A + B
	var sum = A_B + (A_B * vat_pay)
	return sum

}

// ============================================= update status Payment =================================================================
func Update_odertech_status(id, status any) {
	entity.DB().Table("order_teches").Where("id = ?", id).Updates(map[string]interface{}{"for_Payment_status": status})
}

// fn เพื่อ ดึงค่า ordertech id จาก payment id
func get_id_Ordertech_for_status(PaymentID any) int {
	var ID_Ordertech int
	entity.DB().Table("payments").Select("order_tech_id").Where("id = ?", PaymentID).Row().Scan(&ID_Ordertech)
	return ID_Ordertech
}

// ============================================= สำหรับตรวจสอบข้อความถึงลูกค้า =================================================================
// func Message_in_CheckedPayment(c *gin.Context) {
// 	var message_to_customer entity.Checked_payment
// 	id := c.Param("id")
// 	entity.DB().Table("checked_payments").Select("message").Where("payment_id = ?", id)
// 	c.JSON(http.StatusOK, gin.H{"data": message_to_customer})
// }
