export interface AddressTypeInterface {
    ID: number,
    Type_name: string,
}

export interface ProvinceInterface {
    ID: number,
    Province_Name: string,
}

export interface DistrictInterface {
    ID: number,
    District_Name: string,
    ProvinceID: number,
}

export interface TambonInterface {
    ID: number,
    Tambon_Name: string,
    DistrictID: number,
}

export interface AddressInterface {
    ID: number,
    CustomerID: number,
    AddressTypeID: number,
    TambonID: number,
    Post_Code: number,
    Detail: string,
    Record_Time: Date | null;
}

