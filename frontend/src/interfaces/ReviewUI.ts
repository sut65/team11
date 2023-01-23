
export interface ReviewInterface {
    ID: number,
    Product_ID: number,
    Satisfaction_System_ID: number,
    Review_Comment_System: string,
    Satisfaction_Technician_ID: number,
    Review_Comment_Technician: string,
    Timestamp: Date | null;
    Statetus:boolean ,
    Customer_ID: number,
}

export interface Satisfaction_System_Interface {
    ID: number,
    Satisfaction_System_Type: string,
}

export interface Satisfaction_Technician_Interface {
    ID: number,
    Satisfaction_Technician_Type: string,
}

