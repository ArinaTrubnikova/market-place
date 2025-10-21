import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PaymentProductsComponent } from "./payment-products/payment-products";
import { PersonalDataComponent } from "./personal-data/personal-data";
import { PaymentDetailsComponent } from "./payment-details/payment-details";

@Component({
    selector: 'payment-layout',
    standalone: true,
    imports: [RouterOutlet, MatButtonModule, MatStepperModule, PaymentProductsComponent, PersonalDataComponent, PaymentDetailsComponent],
    templateUrl: './payment-layout.html',
    styleUrl: './payment-layout.scss'
})

export class PaymentLayoutComponent {

    isLinear = true;

    isPersonalDataValid: boolean = false;

    isPaymentDataValid: boolean = false;

    onPersonalDataValidityChange(isValid: boolean) {
        this.isPersonalDataValid = isValid;
    }

     onPaymentDataValidityChange(isValid: boolean) {
        this.isPaymentDataValid = isValid;
    }

}