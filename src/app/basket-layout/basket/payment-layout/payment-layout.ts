import { Component } from "@angular/core";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PaymentProductsComponent } from "./payment-products/payment-products";
import { PersonalDataComponent } from "./personal-data/personal-data";
import { PaymentDetailsComponent } from "./payment-details/payment-details";
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { DateValidator } from "../../../common/date-validator";

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
    templateUrl: './payment-layout.html',
    styleUrl: './payment-layout.scss'
})

export class PaymentLayoutComponent {

    isLinear = true;
    personalDataForm!: FormGroup;
    paymentDetailsForm!: FormGroup;
    cirillicPattern = /^[а-яёА-ЯЁ\s\-]+$/;
    minLength = 3

    constructor(private fb: FormBuilder) { }

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
}