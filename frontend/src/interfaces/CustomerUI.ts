export interface GenderInterface {
    ID: number,
    GenderName: string,
}

export interface CareerInterface {
    ID: number,
    CareerName: string,
}

export interface PrefixInterface {
    ID: number,
    PrefixName: string,
}

export interface CustomerInterface {
    ID: number,
    Name: string,
    ID_card: string,
    DOB: Date | null,
    Phone: string

    GENDER_ID: number,
    CAREER_ID: number,
    PREFIX_ID: number,

    Email: string,
    Password: string,
}
