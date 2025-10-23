import { Component } from "@angular/core";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PaymentProductsComponent } from "./payment-products/payment-products";
import { PersonalDataComponent } from "./personal-data/personal-data";
import { PaymentDetailsComponent } from "./payment-details/payment-details";
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DateValidator } from "../../../common/date-validator";
import { SentDataService } from "../../../services/sent-data";
import { StorageService } from "../../../services/storage.service";
import { BuyProduct } from "../../../interface/buy-product.model";

@Component({
    selector: 'payment-layout',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatStepperModule,
        PaymentProductsComponent,
        PersonalDataComponent,
        PaymentDetailsComponent],
    providers: [SentDataService],
    templateUrl: './payment-layout.html',
    styleUrl: './payment-layout.scss'
})

export class PaymentLayoutComponent {

    isLinear = true;
    personalDataForm!: FormGroup;
    paymentDetailsForm!: FormGroup;
    cirillicPattern = /^[а-яёА-ЯЁ\s\-]+$/;
    minLength = 3

    constructor(private fb: FormBuilder, private sentDataService: SentDataService, private storageService: StorageService) { }

    isSecondStepEditable(): boolean {
        return this.personalDataForm.valid
    }

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
            birthDate: ['', [Validators.required, DateValidator.dateValidator()]],
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
}