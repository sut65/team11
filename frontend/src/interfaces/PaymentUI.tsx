export interface PaymentInterface {
    ID: number,
    Sender_name:  string;
    Amount:       Float32Array;
	Amount_Check: Float32Array;
	Date_time:    Date | null;
	Status_ID:    number;
    Bank:         number;
    PAYTECH_ID:   number;
   
    User:UsersInterface
}

export interface BankInterface {
    ID: number,
    Bank_name: string,
}
//ของเพื่อนถ้ามีการเพิ่มเข้ามาแล้ว ให้ดึงของอันกลัก ลบส่วนนี้ออก

export interface PAYTECHInterface {
    ID: number,
    COSTT: string,
}

export interface BInterface {
    ID: number,
    Price: string,
}

export interface UsersInterface {  // add data whan add user
    ID: string,
}
