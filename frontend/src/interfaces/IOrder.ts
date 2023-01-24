// import {DeviceInterface} from "./Device" // รอจากของพืช
// import {AddressInterface} from "./Address" // รอจากของพืช
// import {CustomerInterface} from "./Customer" // รอจากของโต้ง

export interface PayTechInterface {
    ID: number,
    TimeStamp: Date | null;
    Note: string,

    CaseID:   number;
    Case:     CaseInterface

    // DeviceID:   number;
    // Device: DeviceInterface

    // CustomerID:   number;
    // Customer  CustomerInterface

    // AddressID:    number;
    // Address   AddressInterface
}

export interface CaseInterface {
    ID: number,
    CaseText: string,
    LevelText: string,
}