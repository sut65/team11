import { PaymentInterface } from "./PaymentUI";

export interface Checked_paymentInterface {
    ID: number,
    Date_time: Date | null;
    Status_ID: number;
    Other: string;
    Message: string;
    
    Payment_ID: number;
    Payment: PaymentInterface;


    Admin_ID: number;
    // AdminID: number;

}

export interface Status_checkInterface {
    ID: number,
    Status_name: string,
}

export interface AdminInterface {  // add data whan add user
    ID: string,
}
