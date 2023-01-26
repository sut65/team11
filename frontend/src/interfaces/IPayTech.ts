import {TechnicianInterface} from "./TechnicianUI"
import { OrderTechInterface } from "./IOrderTech";


export interface PayTechInterface {
    ID: number,
    Note: string,
    Amount: number,
    CostHardware: number,

    HardwareID:   number;
    Hardware: HardwareInterface

    OrderTechID: number;
    OrderTech: OrderTechInterface

    TechnicianID:   number;
    Technician:  TechnicianInterface
}

export interface HardwareInterface {
    ID: number,
    HardwareName: string,
}