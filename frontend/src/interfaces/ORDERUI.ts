import { AddressInterface } from "./AddressUI";
import { CustomerInterface } from "./CustomerUI";
import { DeviceInterface } from "./IDevice";

export interface ORDERInterface {
    ID: number,
    Date_time: Date | null;
    Reason: string;
    Limits: number;
    CASEID: number;
    CASE: CASEInterface
    DeviceID: number;
    Device: DeviceInterface
    AddressID: number;
    Address: AddressInterface
    StateID :number;
    State: StateInterface
    
    CustomerID: number;
    Name:   string;
    Customer:   CustomerInterface

}

export interface CASEInterface {
    ID: number,
    Case_text: string,
    Level_case:string,
}

export interface StateInterface {
    ID: number,
    State: string,
}


