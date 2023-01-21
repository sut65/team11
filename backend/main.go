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

	// =============== Payment ==========================

	r.GET("/ListBank", controller.ListBank)
	r.POST("/CreateBank", controller.CreateBank)

	//r.GET("/ListPAYTECH", controller.ListPAYTECH)         //ใช้จริงใช้ของเหมียว
	//r.POST("/CreatePAYTECH", controller.CreatePAYTECH)	//ใช้จริงใช้ของเหมียว

	r.GET("/ListPayment", controller.ListPayments)
	r.GET("/GetPayment/:id", controller.GetPayment)
	r.POST("/CreatePayment", controller.CreatePayment)
	r.POST("DeletePayment", controller.DeletePayment)

	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT,PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
