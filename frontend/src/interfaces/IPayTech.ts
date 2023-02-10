import { TechnicianInterface } from "./TechnicianUI";
import { OrderTechInterface } from "./IOrderTech";

export interface PayTechInterface {
  ID: number;
  Note: string;
  Amount: number;
  CostHardware: number;

  HardwareID: number;
  HardwareName: string;
  Hardware: HardwareInterface;

  OrderTechID: number;
  Solving: string,
  TimeOut: Date;
  OrderTech: OrderTechInterface;

  TechnicianID: number;
  Name: string;
  Technician: TechnicianInterface;
}

export interface HardwareInterface {
  ID: number;
  HardwareName: string;
}
