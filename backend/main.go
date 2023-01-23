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

	//=============== B6304577(อาร์ม) -->> ระบบประเมินความพึงพอใจ(Review) ==========================
	r.POST("/CreateSatisfaction_System", controller.CreateSatisfaction_System)
	r.POST("/CreateSatisfaction_Technician", controller.CreateSatisfaction_Technician)
	r.POST("/CreateReview", controller.CreateReview)

	r.PATCH("/UpdateReview", controller.UpdateReview)
	r.DELETE("/DeleteReview", controller.DeleteReview)

	r.GET("/GetListReviews", controller.GetListReviews)
	r.GET("/GetReview/:id", controller.GetReview)
	//=============== B6304577(อาร์ม) -->> ระบบประเมินความพึงพอใจ(Review) ==========================

	// ========== Address ==========
	r.POST("/CreateAddressType", controller.CreateAddressType)
	r.POST("/CreateProvince", controller.CreateProvince)
	r.POST("/CreateDistrict", controller.CreateDistrict)
	r.POST("/CreateTambon", controller.CreateTambon)

	r.POST("/CreateAddress", controller.CreateAddress)
	r.PATCH("/UpdateAddress", controller.UpdateAddress)
	r.DELETE("/DeleteAddress", controller.DeleteAddress)
	r.GET("/GetListAddress", controller.GetListAddress)
	r.GET("/GetAddress/:id", controller.GetAddress)
	// ========== Address ==========

	// =============== Payment =========================================
	r.GET("/ListBank", controller.ListBank)
	r.POST("/CreateBank", controller.CreateBank)
	r.GET("/ListPayment", controller.ListPayments)
	r.GET("/GetPayment/:id", controller.GetPayment)
	r.POST("/CreatePayment", controller.CreatePayment)
	r.POST("/DeletePayment/:id", controller.DeletePayment)
	// =============== Checked_payment ==================================
	r.GET("/ListStatus_check", controller.ListStatus_check)
	r.GET("/ListChecked_payment", controller.ListChecked_payment)
	r.GET("/GetChecked_payment/:id", controller.GetChecked_payment)
	r.POST("/CreateChecked_payment", controller.CreateChecked_payment)
	r.POST("DeleteChecked_payment/:id", controller.DeleteChecked_payment)

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
