import { Component } from "@angular/core";
import { FormGroup, ReactiveFormsModule, FormGroupDirective } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
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
  paymentOnline = { sysName: 'online', description: 'Онлайн' };
  paymentByCard = { sysName: 'byCard', description: 'Картой при получении' };
  paid = { sysName: 'paid', description: 'Уже оплачено' }

  constructor(private formGroupDirective: FormGroupDirective) { }

  ngOnInit() {
    this.paymentDetailsForm = this.formGroupDirective.form
  }

  hasError(controlName: string, errorType: string): boolean {

    const control = this.paymentDetailsForm.get(controlName)

    if (!control?.errors || !(control.dirty || control.touched)) {
      return false;
    }
    return control.hasError(errorType);
  }

}