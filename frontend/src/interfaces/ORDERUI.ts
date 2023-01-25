import { AddressInterface } from "./AddressUI";

export interface ORDERInterface {
    ID: number,
    Date_time: Date | null;
    Reason: string;
    Limit: number;
    CASEID: number;
    DeviceID: number;
    AddressID: AddressInterface;
    // CustomerID: number; //ดึงจากinterface โต้ง
}

export interface CASEInterface {
    ID: number,
    Case_text: string,
    Level_case:string;
}

