package controller

import (
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
	"net/http"
)

// POST Satisfaction_System

func CreateSatisfaction_System(c *gin.Context) {
	var Satisfaction_System entity.Satisfaction_System
	if err := c.ShouldBindJSON(&Satisfaction_System); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Satisfaction_System).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Satisfaction_System})
}

// POST Satisfaction_System

func CreateSatisfaction_Technician(c *gin.Context) {
	var Satisfaction_Technician entity.Satisfaction_Technician
	if err := c.ShouldBindJSON(&Satisfaction_Technician); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Satisfaction_Technician).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Satisfaction_Technician})
}

// POST Satisfaction_System
// Main Table Review

func CreateReview(c *gin.Context) {
	var Checked_payment entity.Checked_payment
	var Customer entity.Customer
	var Satisfaction_System entity.Satisfaction_System
	var Satisfaction_Technician entity.Satisfaction_Technician
	var Review entity.Review

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร Review
	if err := c.ShouldBindJSON(&Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา CheckPayment  ด้วย id
	if tx := entity.DB().Where("id = ?", Review.CheckedPayment_ID).First(&Checked_payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction System  not found"})
		return
	}

	// 12: ค้นหา Satisfaction_System  ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Satisfaction_System_ID).First(&Satisfaction_System); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction System  not found"})
		return
	}

	// 13: ค้นหา Satisfaction_Technician ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Satisfaction_Technician_ID).First(&Satisfaction_Technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction Technician  not found"})
		return
	}

	// 14: ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Customer_ID).First(&Customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	// 15: แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reviewData := entity.Review{
		CheckedPayment_ID:          Review.CheckedPayment_ID,      // โยงความสัมพันธ์กับ Entity Order
		Satisfaction_System_ID:     Review.Satisfaction_System_ID, // โยงความสัมพันธ์กับ Entity Satisfaction_System
		Review_Comment_System:      Review.Review_Comment_System,
		Satisfaction_Technician_ID: Review.Satisfaction_Technician_ID, // โยงความสัมพันธ์กับ Entity Satisfaction_Technician
		Review_Comment_Technician:  Review.Review_Comment_Technician,
		TimestampReview:            Review.TimestampReview, // ตั้งค่าฟิลด์ Timestamp
		StatusReview:               Review.StatusReview,    // ตั้งค่าฟิลด์ Statetus
		Customer_ID:                Review.Customer_ID,     // โยงความสัมพันธ์กับ Entity Customer
		CheckSucceed:               Review.CheckSucceed,
	}

	if err := entity.DB().Create(&reviewData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Review})
}

// GET /Review
func GetListReviews(c *gin.Context) {
	var GetReviews []entity.Review
	if err := entity.DB().Preload("Satisfaction_System").Preload("Satisfaction_Technician").Preload("Customer").Find(&GetReviews).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetReviews})
}

// GET /Review:id // TODO เพิ่มเติม Controller
func GetReview(c *gin.Context) {
	var review entity.Review
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM reviews WHERE id = ?", id).Preload("Satisfaction_System").Preload("Satisfaction_Technician").Preload("Customer").Preload("Checked_payment.Payment.OrderTech.ORDER").Preload("Checked_payment.Payment.OrderTech.Technician").Find(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

// get data by Customer_ID
func ListCheckedPayment_filter_by_customer(c *gin.Context) {
	C_id := c.Param("id")
	var listCheckedPayment_filter_by_customer []entity.Checked_payment
	query := "SELECT * FROM checked_payments WHERE  checked_payments.payment_id in (SELECT payments.id FROM payments WHERE payments.customer_id = " + C_id + ")" + ";"

	if err := entity.DB().Raw(query).Preload("Status_check").Preload("Payment.Customer").Preload("Payment.OrderTech.Technician").Preload("Payment.OrderTech.ORDER").Find(&listCheckedPayment_filter_by_customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listCheckedPayment_filter_by_customer})
}

// PATCH /Review
func UpdateReview(c *gin.Context) {
	var Checked_payment entity.Checked_payment
	var Customer entity.Customer
	var Satisfaction_System entity.Satisfaction_System
	var Satisfaction_Technician entity.Satisfaction_Technician
	var Review entity.Review

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร Review
	if err := c.ShouldBindJSON(&Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา CheckPayment  ด้วย id
	if tx := entity.DB().Where("id = ?", Review.CheckedPayment_ID).First(&Checked_payment); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction System  not found"})
		return
	}

	// 12: ค้นหา Satisfaction_System  ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Satisfaction_System_ID).First(&Satisfaction_System); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction System  not found"})
		return
	}

	// 13: ค้นหา Satisfaction_Technician ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Satisfaction_Technician_ID).First(&Satisfaction_Technician); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Satisfaction Technician  not found"})
		return
	}

	// 14: ค้นหา Customer ด้วย id
	if tx := entity.DB().Where("id = ?", Review.Customer_ID).First(&Customer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	// 15: แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	reviewData := entity.Review{
		CheckedPayment_ID:          Review.CheckedPayment_ID,      // โยงความสัมพันธ์กับ Entity Order
		Satisfaction_System_ID:     Review.Satisfaction_System_ID, // โยงความสัมพันธ์กับ Entity Satisfaction_System
		Review_Comment_System:      Review.Review_Comment_System,
		Satisfaction_Technician_ID: Review.Satisfaction_Technician_ID, // โยงความสัมพันธ์กับ Entity Satisfaction_Technician
		Review_Comment_Technician:  Review.Review_Comment_Technician,
		TimestampReview:            Review.TimestampReview, // ตั้งค่าฟิลด์ Timestamp
		StatusReview:               Review.StatusReview,    // ตั้งค่าฟิลด์ Statetus
		Customer_ID:                Review.Customer_ID,     // โยงความสัมพันธ์กับ Entity Customer
		CheckSucceed:               Review.CheckSucceed,
	}
	if err := entity.DB().Model(reviewData).Where("id = ?", Review.ID).Updates(&reviewData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Review})
}

// PATCH /func UpdateCheckForShowReviewBT
func UpdateCheckForShowReviewBT(c *gin.Context) {
	var cp entity.Checked_payment
	if err := c.ShouldBindJSON(&cp); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(cp).Where("id = ?", cp.ID).Update("CheckForShowReviewBT", cp.CheckForShowReviewBT).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cp})
}

// DELETE /Review
func DeleteReview(c *gin.Context) {
	var Review entity.Review
	if err := c.ShouldBindJSON(&Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM reviews WHERE id = ?", Review.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}
