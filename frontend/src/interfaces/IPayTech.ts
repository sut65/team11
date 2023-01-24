// import {TypeInterface} from "./Type" // รอจากของพืช
// import {TechnicianInterface} from "./Technician" // รอจากของโต้ง
// import {ORDERInterface} from "./ORDER" // รอจากของฟิว

export interface PayTechInterface {
    ID: number,
    TimeStamp: Date | null;
    Note: string,

    HardwareID:   number;
    Hardware: HardwareInterface

    // TypeID:   number;
    // Type: typeInterface

    // TechnicianID:   number;
    // Technician  TechnicianInterface

    // OrderID:    number;
    // ORDER   ORDERInterface
}

export interface HardwareInterface {
    ID: number,
    HardwareName: string,
    AmountHardware: number,
    CostHardware:   number;
}