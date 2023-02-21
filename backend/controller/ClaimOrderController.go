package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/sut65/team11/entity"
)

//POST Urgency

func CreateUrgency(c *gin.Context) {
	var Urgency entity.Urgency
	if err := c.ShouldBindJSON(&Urgency); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&Urgency).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Urgency})
}

func GetListUrgency(c *gin.Context) {
	var GetUrgencys []entity.Urgency
	if err := entity.DB().Find(&GetUrgencys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetUrgencys})
}

// POST StatusClaim
func CreateStatusClaim(c *gin.Context) {
	var StatusClaim entity.StatusClaim
	if err := c.ShouldBindJSON(&StatusClaim); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&StatusClaim).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": StatusClaim})
}

// POST Claim Order
// Main Table Claim Order

func CreateClaimOrder(c *gin.Context) {
	// var Order_ID entity.Order
	var Review entity.Review
	var Urgency entity.Urgency
	var StatusClaim entity.StatusClaim
	var ClaimOrder entity.Claim_Order

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 10 จะถูก bind เข้าตัวแปร Review
	if err := c.ShouldBindJSON(&ClaimOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา Review  ด้วย id
	if tx := entity.DB().Where("id = ?", ClaimOrder.Review_ID).First(&Review); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Review not found"})
		return
	}

	// 12: ค้นหา Urgency ด้วย id
	if tx := entity.DB().Where("id = ?", ClaimOrder.Urgency_ID).First(&Urgency); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Urgency not found"})
		return
	}
	// 13: ค้นหา Status ด้วย id
	if tx := entity.DB().Where("id = ?", ClaimOrder.StatusClaim_ID).First(&StatusClaim); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	// 14: แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(ClaimOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	claimData := entity.Claim_Order{
		Review_ID:      ClaimOrder.Review_ID,      // โยงความสัมพันธ์กับ Entity Review
		Urgency_ID:     ClaimOrder.Urgency_ID,     // โยงความสัมพันธ์กับ Entity Urgency
		ClaimTime:      ClaimOrder.ClaimTime,      // ตั้งค่าฟิลด์ ClaimTime
		OrderProblem:   ClaimOrder.OrderProblem,   // ตั้งค่าฟิลด์ OrderProblem
		Claim_Comment:  ClaimOrder.Claim_Comment,  // ตั้งค่าฟิลด์ Claim_Comment
		StatusClaim_ID: ClaimOrder.StatusClaim_ID, // ตั้งค่าฟิลด์ Status
		// Customer_ID  :           Review.Customer_ID  , // โยงความสัมพันธ์กับ Entity Customer
	}

	if err := entity.DB().Create(&claimData).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ClaimOrder})
}

// GET /ClaimOrder
func GetListClaimOrders(c *gin.Context) {
	var GetClaimOrders []entity.Claim_Order
	if err := entity.DB().Preload("Urgency").Preload("StatusClaim").Preload("Review.Satisfaction_System").Preload("Review.Satisfaction_Technician").Preload("Review.Customer").Preload("Review.Checked_payment.Payment.OrderTech.ORDER").Preload("Review.Checked_payment.Payment.OrderTech.Technician").Find(&GetClaimOrders).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": GetClaimOrders})
}

// GET /ClaimOrder:id
func GetClaimOrder(c *gin.Context) {
	var ClaimOrder entity.Claim_Order
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM claim_orders WHERE id = ?", id).Preload("Urgency").Preload("StatusClaim").Preload("Review.Satisfaction_System").Preload("Review.Satisfaction_Technician").Preload("Review.Checked_payment.Payment.Customer").Preload("Review.Checked_payment.Payment.OrderTech.ORDER").Preload("Review.Checked_payment.Payment.OrderTech.Technician").Find(&ClaimOrder).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ClaimOrder})
}

// get data by Customer_ID => GetClaimOrder
func ListClaims_filter_by_customer(c *gin.Context) {
	C_id := c.Param("id")
	var listClaims_filter_by_customer[]entity.Claim_Order
	query := "SELECT * FROM claim_orders WHERE claim_orders.review_id = (SELECT reviews.id FROM reviews WHERE reviews.customer_id = " + C_id + ")"+";"

	if err := entity.DB().Raw(query).Preload("Urgency").Preload("StatusClaim").Preload("Review.Satisfaction_System").Preload("Review.Satisfaction_Technician").Preload("Review.Customer").Preload("Review.Checked_payment.Payment.OrderTech.ORDER").Preload("Review.Checked_payment.Payment.OrderTech.Technician").Find(&listClaims_filter_by_customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listClaims_filter_by_customer})
}

// get data by Customer_ID
func ListReviews_filter_by_customer(c *gin.Context) {
	C_id := c.Param("id")
	var listReviews_filter_by_customer[]entity.Review
	query := "SELECT * FROM reviews WHERE reviews.customer_id =  " + C_id + ";"

	if err := entity.DB().Raw(query).Preload("Satisfaction_System").Preload("Satisfaction_Technician").Preload("Customer").Preload("Checked_payment.Payment.OrderTech.ORDER").Preload("Checked_payment.Payment.OrderTech.Technician").Find(&listReviews_filter_by_customer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": listReviews_filter_by_customer})
}


// PATCH /ClaimOrder
func UpdateClaimOrder(c *gin.Context) {
	var ClaimOrder entity.Claim_Order

	if err := c.ShouldBindJSON(&ClaimOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(ClaimOrder).Where("id = ?", ClaimOrder.ID).Updates(map[string]interface{}{"Review_ID": ClaimOrder.Review_ID, "Urgency_ID": ClaimOrder.Urgency_ID, "ClaimTime": ClaimOrder.ClaimTime, "OrderProblem": ClaimOrder.OrderProblem, "Claim_Comment": ClaimOrder.Claim_Comment, "StatusClaim_ID": ClaimOrder.StatusClaim_ID}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ClaimOrder})
}

// PATCH /UpdateClaimOrderStatus
func UpdateClaimOrderStatus(c *gin.Context) {
	var ClaimOrder entity.Claim_Order

	if err := c.ShouldBindJSON(&ClaimOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(ClaimOrder).Where("id = ?", ClaimOrder.ID).Updates(map[string]interface{}{"StatusClaim_ID": ClaimOrder.StatusClaim_ID}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ClaimOrder})
}

// PATCH /UpdateCheckBtEditAndDelInReview
func UpdateCheckBtEditAndDelInReview(c *gin.Context) {
	var review entity.Review

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(review).Where("id = ?", review.ID).Updates(map[string]interface{}{"CheckDisableBtEditAndDel": review.CheckDisableBtEditAndDel}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}
// PATCH /UpdateOrderStateForClaimOrder
func UpdateOrderStateForClaimOrder(c *gin.Context) {
	var Order entity.ORDER

	if err := c.ShouldBindJSON(&Order); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(Order).Where("id = ?", Order.ID).Updates(map[string]interface{}{"StateID": Order.StateID}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Order})
}



// PATCH /Review
func UpdateReviewINClaimOrder(c *gin.Context) {
	var Review entity.Review

	if err := c.ShouldBindJSON(&Review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Model(Review).Where("id = ?", Review.ID).Updates(map[string]interface{}{"CheckSucceed": Review.CheckSucceed}).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": Review})
}

// DELETE /ClaimOrder
func DeleteClaimOrder(c *gin.Context) {
	var ClaimOrder entity.Claim_Order
	if err := c.ShouldBindJSON(&ClaimOrder); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Exec("DELETE FROM claim_orders WHERE id = ?", ClaimOrder.ID); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Claim Order not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": "DELETE SUCCEED!!"})
}
