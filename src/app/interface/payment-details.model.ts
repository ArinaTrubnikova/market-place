export interface PaymentDetails {
    wayToPay: string,
    cardNumber: string,
    leaveDoor: boolean,
    address: {
        city: string,
        street: string,
        house: string,
        flat: string
    }
}