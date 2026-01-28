import { FormArray, FormGroup } from "@angular/forms";
import { CardSale, CardSaleForm } from "./card-sale.model";
import { PaymentDetails, PaymentDetailsForm } from "./payment-details.model";
import { PersonalData, PersonalDataForm } from "./personal-data.model";

export class BuyProduct {
    productData!: CardSale[];
    personalData!: PersonalData;
    paymentData!: PaymentDetails;

    constructor(data?: Partial<BuyProduct>) {
        const initial = {
            productData: [],
            personalData: null,
            paymentData: null,
            ...data,
        }

        this.productData = initial.productData.map(product =>  new CardSale(product));
        this.personalData = new PersonalData(initial.personalData);
        this.paymentData = new PaymentDetails(initial.paymentData);

    }
}

export class BuyProductForm {
    productData!: FormArray<FormGroup<CardSaleForm>>;
    personalData!: FormGroup<PersonalDataForm>;
    paymentData!: FormGroup<PaymentDetailsForm>;

    static create(data?: BuyProduct) {
        return new FormGroup({
            productData: new FormArray(data?.productData.map(product => CardSaleForm.createForm(product)) || []),
            personalData: PersonalDataForm.createForm(data?.personalData),
            paymentData: PaymentDetailsForm.createForm(data?.paymentData)
        })
    }
}