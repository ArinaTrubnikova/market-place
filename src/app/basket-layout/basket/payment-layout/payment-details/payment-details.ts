import { Component, output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

@Component({
  selector: 'payment-details',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatCheckboxModule, MatSelectModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './payment-details.html',
  styleUrl: './payment-details.scss'
})

export class PaymentDetailsComponent {

  paymentDetailsForm!: FormGroup;
  isPaymentFormValidChange = output<boolean>();

  constructor(private fb: FormBuilder) {
    this.paymentDetailsForm = this.createForm();

    this.paymentDetailsForm.statusChanges.subscribe(() => {
      this.isPaymentFormValidChange.emit(this.paymentDetailsForm.valid);
    });
  }

  createForm(): FormGroup {
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

  hasError(controlName: string, errorType: string): boolean {

    const control = this.paymentDetailsForm.get(controlName)

    if (!control?.errors || !(control.dirty || control.touched)) {
      return false;
    }
    return control.hasError(errorType);
  }

}