export interface PersonalData {
    lastName: string,
    firstName: string,
    middleName: string,
    noMiddleName: boolean,
    birthDate: Date,
    contacts: {
        email: string,
        phone: string
    }
}