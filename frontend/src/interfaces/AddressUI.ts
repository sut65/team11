import { CustomerInterface } from "./CustomerUI";

export interface AddressTypeInterface {
    ID: number,
    Type_Name: string,
}

export interface ProvinceInterface {
    ID: number,
    Province_Name: string,
}

export interface DistrictInterface {
    ID: number,
    District_Name: string,
    ProvinceID: number,
    Province: ProvinceInterface,
}

export interface TambonInterface {
    ID: number,
    Tambon_Name: string,
    DistrictID: number,
    District: DistrictInterface,
}

export interface AddressInterface {
    ID: number,
    CustomerID: number,
    Customer: CustomerInterface,
    AddressTypeID: number,
    AddressType: AddressTypeInterface,
    TambonID: number,
    Tambon: TambonInterface,
    Post_Code: number,
    Detail: string,
    Record_Time: Date | null;
}

