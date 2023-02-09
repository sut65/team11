package main

import (
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/controller"
	"github.com/sut65/team11/entity"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	// ================= USER ===========================
	r.GET("/GetUser", controller.GetUser)
	r.GET("/ListUsers", controller.ListUsers)

	//=============== B6311117(โต้ง) -->> ระบบสมาชิกแจ้งซ่อม ==========================
	r.GET("/GetGender", controller.ListGender)
	r.GET("/GetCareer", controller.ListCareer)
	r.GET("/GetPrefix", controller.ListPrefix)
	r.GET("/GetCustomers", controller.ListCustomer)
	r.GET("/GetCustomer/:id", controller.GetCustomer)
	r.PATCH("/UpdateCustomer", controller.UpdateCustomer)
	r.DELETE("/DeleteCustomer", controller.DeleteCustomer)
	r.POST("/CreateCustomer", controller.CreateCustomer)

	//=============== B6311117(โต้ง) -->> ระบบช่าง ==========================
	r.GET("/GetGenderT", controller.ListGenderT)
	r.GET("/GetEducate", controller.ListEducate)
	r.GET("/GetPrefixT", controller.ListPrefixT)
	r.GET("/GetTechnicians", controller.ListTechnician)
	r.GET("/GetTechnician/:id", controller.GetTechnician)
	r.PATCH("/UpdateTechnician", controller.UpdateTechnician)
	r.DELETE("/DeleteTechnician", controller.DeleteTechnician)
	r.POST("/CreateTechnician", controller.CreateTechnician)

	// OrderTech
	// =============== B6310646(meow) -->> ระบบรับออเดอร์ช่าง(ordertech) ==========================
	r.GET("/order-teches", controller.ListOrderTechs)
	r.GET("/order-tech/:id", controller.GetOrderTech)
	r.POST("/order-tech", controller.CreateOrderTech)
	r.PATCH("/update-order-tech", controller.UpdateOrderTech)

	r.GET("/statuses", controller.ListStatus)
	r.GET("/status/:id", controller.GetStatus)
	r.GET("/damages", controller.ListDamage)
	r.GET("/damage/:id", controller.GetDamage)
	r.GET("/cost-details", controller.ListCostDetail)
	r.GET("/cost-detail/:id", controller.GetCostDetail)
	// =============== B6310646(meow) -->> ระบบรับออเดอร์ช่าง(ordertech) ==========================

	// PayTech
	// =============== B6310646(meow) -->> ระบบบันทึกค่าใช้จ่ายของช่าง(paytech) ==========================
	r.GET("/pay-teches", controller.ListPayTech)
	r.GET("/pay-tech/:id", controller.GetPayTech)
	r.POST("/pay-tech", controller.CreatePayTech)
	r.PATCH("/update-pay-tech", controller.UpdatePayTech)
	r.DELETE("/delete-pay-tech/:id", controller.DeletePayTech)

	r.GET("/hardwares", controller.ListHardware)
	r.GET("/hardware/:id", controller.GetHardware)
	// =============== B6310646(meow) -->> ระบบบันทึกค่าใช้จ่ายของช่าง(paytech) ==========================

	//=============== B6304577(อาร์ม) -->> ระบบประเมินความพึงพอใจ(Review) ==========================
	r.POST("/CreateSatisfaction_System", controller.CreateSatisfaction_System)
	r.POST("/CreateSatisfaction_Technician", controller.CreateSatisfaction_Technician)
	r.POST("/CreateReview", controller.CreateReview)

	r.PATCH("/UpdateReview", controller.UpdateReview)
	r.DELETE("/DeleteReview", controller.DeleteReview)

	r.GET("/GetListReviews", controller.GetListReviews)
	r.GET("/GetReview/:id", controller.GetReview)
	//=============== B6304577(อาร์ม) -->> ระบบประเมินความพึงพอใจ(Review) ==========================

	//=============== B6321765 (พืชผล) -->> ระบบที่อยู่ผู้แจ้ง (Address) ==========================
	r.POST("/CreateAddressType", controller.CreateAddressType)
	r.POST("/CreateProvince", controller.CreateProvince)
	r.POST("/CreateDistrict", controller.CreateDistrict)
	r.POST("/CreateTambon", controller.CreateTambon)

	r.POST("/CreateAddress", controller.CreateAddress)
	r.PATCH("/UpdateAddress", controller.UpdateAddress)
	r.DELETE("/DeleteAddress/:id", controller.DeleteAddress)
	r.GET("/GetListAddress", controller.GetListAddress)
	r.GET("/GetAddress/:id", controller.GetAddress)
	r.GET("/GetListTambon", controller.GetListTambon)
	r.GET("/GetDistrict/:id", controller.GetDistrict)
	r.GET("/GetTambon/:id", controller.GetTambon)
	r.GET("/GetListDistrict", controller.GetListDistrict)
	r.GET("/GetListProvince", controller.GetListProvince)
	r.GET("/GetListAddressType", controller.GetListAddressType)
	//=============== B6321765 (พืชผล) -->> ระบบที่อยู่ผู้แจ้ง (Address) ==========================

	//=============== B6321765 (พืชผล) -->> ระบบอุปกรณ์ผู้แจ้ง (Device) ==========================
	r.POST("/CreateType", controller.CreateType)
	r.GET("/GetListType", controller.GetListType)
	r.GET("/GetListWindows", controller.GetListWindows)
	r.POST("/CreateWindows", controller.CreateWindows)

	r.POST("/CreateDevice", controller.CreateDevice)
	r.PATCH("/UpdateDevice", controller.UpdateDevice)
	r.DELETE("/DeleteDevice/:id", controller.DeleteDevice)
	r.GET("/GetListDevice", controller.GetListDevice)
	r.GET("/GetDevice/:id", controller.GetDevice)
	//=============== B6321765 (พืชผล) -->> ระบบอุปกรณ์ผู้แจ้ง (Device) ==========================

	// ========== B6304508 (ฟิวส์) Order ==========
	r.POST("/CreateCASE", controller.CreateCASE)
	r.GET("/GetCase", controller.GetCase)
	r.GET("/ListCase", controller.ListCase)
	r.POST("/CreateState", controller.CreateState)
	r.GET("/GetState", controller.GetState)
	r.GET("/ListState", controller.ListState)
	r.POST("/CreateOrder", controller.CreateOrder)
	r.PATCH("/UpdateOrder", controller.UpdateOrder)
	r.PATCH("/UpdateOrderCR", controller.UpdateOrderCR)
	r.GET("/GetListOrder", controller.GetListOrder)
	r.GET("/GetOrder/:id", controller.GetOrder)
	// ========== B6304508 (ฟิวส์) Order ==========

	// ========== Refund ==========
	r.POST("/CreateCause", controller.CreateCause)
	r.GET("/GetCause", controller.GetCause)
	r.GET("/ListCause", controller.ListCause)
	r.POST("/CreateContact", controller.CreateContact)
	r.GET("/GetContact", controller.GetContact)
	r.GET("/ListContact", controller.ListContact)
	r.POST("/CreateRefund", controller.CreateRefund)
	r.GET("/GetListRefund", controller.GetListRefund)
	r.GET("/GetRefund/:id", controller.GetRefund)
	r.GET("/DeleteRefund", controller.DeleteRefund)
	// ========== Refund ==========

	// =============== Payment =========================================
	r.GET("/ListBank", controller.ListBank)
	r.POST("/CreateBank", controller.CreateBank)
	r.GET("/ListPayment", controller.ListPayments)
	r.GET("/GetPayment/:id", controller.GetPayment)
	r.POST("/CreatePayment", controller.CreatePayment)
	r.PATCH("/UpdatePayment", controller.UpdatePayment)
	r.POST("/DeletePayment/:id", controller.DeletePayment)

	r.GET("/ListPayment_for_Check", controller.ListPayment_for_Check) //เรียกรายการที่ยังไม่เช็คไปแสดง เพื่อเลือกเช็ค
	r.GET("/SendmoneyToFrontend/:id", controller.SendmoneyToFrontend)
	r.GET("/ListOrderTechForPaymment", controller.ListOrderTechForPaymment)

	// =============== Checked_payment ==================================
	r.GET("/ListStatus_check", controller.ListStatus_check)
	r.GET("/ListChecked_payment", controller.ListChecked_payment)
	r.GET("/GetChecked_payment/:id", controller.GetChecked_payment)
	r.PATCH("/UpdateChecked_payment", controller.UpdateCheckedPayment)
	r.POST("/CreateChecked_payment", controller.CreateChecked_payment)
	r.POST("DeleteChecked_payment/:id", controller.DeleteChecked_payment)

	r.GET("/List_only_checkedPayment", controller.List_only_checkedPayment) //เรียกรายการ checkedppayment โดยไม่เอาสถานะ "รอการตรวจสอบการชำระเงิน"

	//=============== B6304577(อาร์ม) -->> ระบบรายงานปัญหาหลังการซ่อม(Claim) ==========================
	r.POST("/CreateUrgency", controller.CreateUrgency)
	r.POST("/CreatStatusClaim", controller.CreateStatusClaim)
	r.POST("/CreateClaimOrder", controller.CreateClaimOrder)

	r.PATCH("/UpdateClaimOrder", controller.UpdateClaimOrder)
	r.PATCH("/UpdateClaimOrderStatus", controller.UpdateClaimOrderStatus)
	r.PATCH("/UpdateReviewINClaimOrder", controller.UpdateReviewINClaimOrder)
	r.DELETE("/DeleteClaimOrder", controller.DeleteClaimOrder)

	r.GET("/GetListClaimOrders", controller.GetListClaimOrders)
	r.GET("/GetListUrgency", controller.GetListUrgency)
	r.GET("/GetClaimOrder/:id", controller.GetClaimOrder)
	//=============== B6304577(อาร์ม) -->> ระบบรายงานปัญหาหลังการซ่อม(Claim) ==========================

	// login Customer Route
	r.POST("/SignInCustomer", controller.SignInCustomer)
	// login Technician Route
	r.POST("/SignInTechnician", controller.SignInTechnician)
	// login Admin Route
	r.POST("/SignInAdmin", controller.SignInAdmin)

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH,DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
