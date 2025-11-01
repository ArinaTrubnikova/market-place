export interface PurchaseHistory {
    lastName: string;
    firstName: string;
    middleName?: string;
    address: {
        city: string;
        street: string;
        house: string;
        flat: string
    },
    products: [{
        id: number;
        title: string;
        description: string;
        cost: number;
        count: number
    }]
}