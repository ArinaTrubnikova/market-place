import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule, FormGroupDirective, Validators } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule, MatSelectChange } from "@angular/material/select";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { flushValue } from "../../../../common/flush-value";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'payment-details',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatIconModule],
  providers: [provideNgxMask()],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss'
})

export class PaymentDetailsComponent {

  paymentDetailsForm!: FormGroup;
  paymentCases: any[] = [
    { sysName: 'online', description: 'Онлайн' },
    { sysName: 'byCard', description: 'Картой при получении' },
    { sysName: 'paid', description: 'Уже оплачено' },
  ];
  flushValue = flushValue;

  constructor(private formGroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.paymentDetailsForm = this.formGroupDirective.form
  }

  hasError(controlName: string, errorType: string): boolean {

    const control = this.paymentDetailsForm.get(controlName);

    if (!control?.errors || !(control.dirty || control.touched)) {
      return false;
    }

    return control.hasError(errorType);
  }

  wayToPayChange(event: MatSelectChange) {

    const isChanged = event.value;
    const cardControl = this.paymentDetailsForm.get('cardNumber');

    if (isChanged !== 'online') {
      cardControl?.disable();
      cardControl?.reset();
      cardControl?.clearValidators();
    } else {
      cardControl?.enable();
      cardControl?.setValidators([Validators.required, Validators.minLength(16)]);
    }
  }
}