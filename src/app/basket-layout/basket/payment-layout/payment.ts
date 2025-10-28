import { Component, inject, OnInit } from "@angular/core";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PersonalDataComponent } from "./personal-data/personal-data";
import { PaymentDetailsComponent } from "./payment-details/payment-details";
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { dateValidator } from "../../../common/date-validator";
import { SentDataService } from "../../../services/sent-data";
import { StorageService } from "../../../services/storage.service";
import { BuyProduct } from "../../../interface/buy-product.model";
import { Observable } from "rxjs";
import { AmountCard } from "../../../interface/product-card.model";
import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { RussianDateAdapter } from "../../../common/date-adapter";


@Component({
    selector: 'payment-layout',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatStepperModule,
        PersonalDataComponent,
        PaymentDetailsComponent, AsyncPipe, CurrencyPipe],
    providers: [SentDataService,
        {provide: DateAdapter, useClass: RussianDateAdapter}
    ],
    templateUrl: './payment.html',
    styleUrl: './payment.scss'
})

export class PaymentLayoutComponent implements OnInit {

    personalDataForm!: FormGroup;
    paymentDetailsForm!: FormGroup;
    cirillicPattern = /^[а-яёА-ЯЁ\s\-]+$/;
    minLength = 3;
    private storageService = inject(StorageService);
    toPaymentCards$: Observable<AmountCard[]> = this.storageService.products$;

    constructor(private fb: FormBuilder, private sentDataService: SentDataService) { }

    ngOnInit() {
        this.personalDataForm = this.createPersonalDataForm();
        this.paymentDetailsForm = this.createPaymentDetailsForm();
    }

    createPersonalDataForm(): FormGroup {
        return this.fb.group({
            lastName: ['', [Validators.required, Validators.minLength(this.minLength), Validators.pattern(this.cirillicPattern)]],
            firstName: ['', [Validators.required, Validators.minLength(this.minLength), Validators.pattern(this.cirillicPattern)]],
            noMiddleName: [false],
            middleName: ['', [Validators.required, Validators.minLength(this.minLength), Validators.pattern(this.cirillicPattern)]],
            birthDate: ['', [Validators.required, dateValidator()]],
            contacts: this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required]]
            })
        });
    }

    createPaymentDetailsForm(): FormGroup {
        return this.fb.group({
            wayToPay: ['', [Validators.required]],
            cardNumber: ['', [Validators.required, Validators.minLength(16)]],
            leaveDoor: [false],
            address: this.fb.group({
                city: ['', [Validators.required, Validators.maxLength(100)]],
                street: ['', [Validators.required, Validators.maxLength(100)]],
                house: ['', [Validators.required]],
                flat: ['', [Validators.required]]
            })
        });
    }

    onSubmit() {

        if (this.personalDataForm.valid && this.paymentDetailsForm.valid) {

            let phone = this.personalDataForm.get('contacts.phone')?.value;

            if (phone.length <= 10) {
                phone = '7' + this.personalDataForm.get('contacts.phone')?.value
            }

            const productArray = this.storageService.productValue.map(product => ({
                id: product.id,
                count: product.count
            })
            )

            const unionData: BuyProduct = {
                personalData: {
                    ...this.personalDataForm.value,
                    contacts: {
                        ...this.personalDataForm.value.contacts,
                        phone: phone
                    },
                },
                paymentData: this.paymentDetailsForm.value,
                productData: productArray
            };
            this.sentDataService.sentData(unionData);

            console.log(unionData);
        }
    }

    getTotalPrice() {
        return this.storageService.productValue.reduce((total, product) => total + (product.cost * product.count), 0);
    }
}