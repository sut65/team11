// import {TechnicianInterface} from "./Technician" // รอจากของโต้ง
// import {ORDERInterface} from "./ORDER" // รอจากของฟิว

import { ORDERInterface } from "./ORDERUI"; //จั๊ดแก้ไข



export interface OrderTechInterface {
    ID: number,
    Solving: string,
    TimeOut: Date | null;

    StatusID:   number;
    Status: StatusInterface

    DamageID:   number;
    Damage: DamageInterface

    CostDetailID:   number;
    CostDetail: CostDetailInterface

    // TechnicianID:   number;
    // Technician  TechnicianInterface

    OrderID:    number; //จั๊ดแก้ไข
    ORDER:      ORDERInterface; //จั๊ดแก้ไข

}

export interface StatusInterface {
    ID: number,
    Statusname: string;
}

export interface DamageInterface {
    ID: number,
    Damagename: string;
}

export interface CostDetailInterface {
    ID: number,
    Cost: number;
}