import {TechnicianInterface} from "./TechnicianUI"
import {ORDERInterface} from "./ORDERUI"

export interface OrderTechInterface {
    ID: number,
    Solving: string,
    TimeOut: Date;
    ForPaymentStatus: boolean;

    StatusID:   number;
    StatusName: string;
    Status: StatusInterface

    DamageID:   number;
    DamageName: string;
    Damage: DamageInterface

    CostDetailID:   number;
    Cost: number;
    CostDetail: CostDetailInterface

    TechnicianID:   number;
    Name: string;
    Technician:  TechnicianInterface

    OrderID:    number;
    Reason: string;
    Date_time: Date | null;
    Limits: number;
    ORDER:      ORDERInterface;
}

export interface StatusInterface {
    ID: number,
    StatusName: string;
}

export interface DamageInterface {
    ID: number,
    DamageName: string;
}

export interface CostDetailInterface {
    ID: number,
    Cost: number;
}