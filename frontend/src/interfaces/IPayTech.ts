// import {TypeInterface} from "./Type" // รอจากของพืช
// import {TechnicianInterface} from "./Technician" // รอจากของโต้ง
// import {ORDERInterface} from "./ORDER" // รอจากของฟิว

import { OrderTechInterface } from "./IOrderTech"; //จั๊ดแก้ไข


export interface PayTechInterface {
    ID: number,
    TimeStamp: Date | null;
    Note: string,

    HardwareID:   number;
    Hardware: HardwareInterface

    OrderTechID: number;
    OrderTech: OrderTechInterface

    

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