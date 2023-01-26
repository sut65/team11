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
    TypeID: number,
    WindowsID: number,
    Save_Time: Date | null;
}

