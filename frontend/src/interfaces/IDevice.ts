import { CustomerInterface } from "./CustomerUI";

export interface TypeInterface {
    ID: number,
    Type_Name: string,
}

export interface WindowsInterface {
    ID: number,
    Windows_Name: string,
}

export interface DeviceInterface {
    ID: number,
    CPU: string,
    Monitor: string,
    GPU: string,
    RAM: string,
    Harddisk: string,
    Problem: string,
    CustomerID: number,
    Customer: CustomerInterface,
    TypeID: number,
    Type:   TypeInterface,
    WindowsID: number,
    Save_Time: Date | null;
}

