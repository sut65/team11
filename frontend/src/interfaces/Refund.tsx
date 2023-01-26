import { ORDERInterface } from "./ORDERUI";

export interface RefundInterface {
    ID: number,
    Refund_Cause :   string,
    Refund_Contact: string,
    Date_time: Date | null;
    CauseID:    number;
    Cause: CauseInterface
    OrderID :number;
    ORDER: ORDERInterface
    ContactID:   number;
    Contact: ContactInterface
}

export interface CauseInterface {
    ID: number,
    Cause_text: string,
    By_text: string,
}

export interface ContactInterface {
    ID: number,
    Contact: string,
    Times: string,
}


