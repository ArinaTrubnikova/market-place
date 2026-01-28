import { FormControl, FormGroup, Validators } from "@angular/forms";

export class CardSale {
    id!: number | null;
    count!: number | null;

    constructor(data?: Partial<CardSale>) {
        const initial = {
            id: null,
            count: null,
            ...data,
        }

        this.id = initial.id;
        this.count = initial.count;
    }
}

export class CardSaleForm {
    id!: FormControl<number | null>;
    count!: FormControl<number | null>;

    static createForm(data?: CardSale) {
        return new FormGroup<CardSaleForm>({
            id: new FormControl(data?.id || null, Validators.required),
            count: new FormControl(data?.count || 1, [
                Validators.required,
                Validators.min(1)
            ])
        });
    }
}