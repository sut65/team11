import {TechnicianInterface} from "./TechnicianUI"
import {ORDERInterface} from "./ORDERUI"

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

    TechnicianID:   number;
    Technician:  TechnicianInterface

    OrderID:    number;
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