import { FormControl, FormGroup, Validators } from "@angular/forms";

export class PaymentDetails {
    wayToPay!: string | null;
    cardNumber!: string | null;
    leaveDoor!: boolean | null;
    address!: {
        city: | null;
        street: string | null;
        house: string | null;
        flat: string | null;
    }

    constructor(data?: Partial<PaymentDetails | null>) {
        const initial = {
            wayToPay: null,
            cardNumber: null,
            leaveDoor: false,
            address: {
                city: null,
                street: null,
                house: null,
                flat: null,
            },
            ...data,
        }

        this.wayToPay = initial.wayToPay;
        this.cardNumber = initial.cardNumber;
        this.leaveDoor = initial.leaveDoor;
        this.address.city = initial.address.city;
        this.address.street = initial.address.street;
        this.address.house = initial.address.house;
        this.address.flat = initial.address.flat;
    }
}


export class PaymentDetailsForm {
    wayToPay!: FormControl<string | null>;
    cardNumber!: FormControl<string | null>;
    leaveDoor!: FormControl<boolean | null>;
    address!: FormGroup<{
        city: FormControl<string | null>;
        street: FormControl<string | null>;
        house: FormControl<string | null>;
        flat: FormControl<string | null>;
    }>;

    static createForm(data?: PaymentDetails) {

        return new FormGroup<PaymentDetailsForm>({
            wayToPay: new FormControl<string | null>(data?.wayToPay || null, Validators.required),
            cardNumber: new FormControl<string | null>(data?.cardNumber || null, [Validators.required, Validators.minLength(16)]),
            leaveDoor: new FormControl<boolean | null>(data?.leaveDoor || false),
            address: new FormGroup({
                city: new FormControl<string | null>(data?.address.city || null, [Validators.required, Validators.maxLength(100)]),
                street: new FormControl<string | null>(data?.address.street || null, [Validators.required, Validators.maxLength(100)]),
                house: new FormControl<string | null>(data?.address.house || null, Validators.required),
                flat: new FormControl<string | null>(data?.address.flat || null, Validators.required),
            })
        });
    }
}
