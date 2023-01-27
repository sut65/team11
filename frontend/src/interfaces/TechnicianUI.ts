export interface GenderTInterface {
    ID: number,
    GenderName: string,
}

export interface EducateInterface {
    ID: number,
    EducateName: string,
}

export interface PrefixTInterface {
    ID: number,
    PrefixName: string,
}

export interface TechnicianInterface {
    ID: number,
    Name: string,
    ID_card: string,
    DOB: Date | null,
    Phone: string

    GENDER_ID: number,
    EDUCATE_ID: number,
    PREFIX_ID: number,

    Location: string,
    Username: string,
    Password: string,
}
