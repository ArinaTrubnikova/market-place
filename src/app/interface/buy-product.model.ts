import type { CardSale } from "./card-sale.model";
import type { PaymentDetails } from "./payment-details.model";
import type { PersonalData } from "./personal-data.model";

export interface BuyProduct {
    productData: CardSale[],
    personalData: PersonalData,
    paymentData: PaymentDetails,
}