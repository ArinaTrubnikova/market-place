import { Component, inject, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PersonalDataComponent } from './personal-data/personal-data';
import { PaymentDetailsComponent } from './payment-details/payment-details';
import { Validators, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { dateValidator } from '../../../common/validators/date-validator';
import { DataService } from '../../../services/data.service';
import { StorageService } from '../../../services/storage.service';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AmountCard } from '../../../product-component/interfaces/product-card.model';
import { AsyncPipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { RussianDateAdapter } from '../../../common/date-adapter';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCardComponent } from '../../../common/components/product-card/product-card';
import { BuyProduct } from '../interfaces/buy-product.model';

@Component({
  selector: 'payment-layout',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatStepperModule,
    PersonalDataComponent,
    PaymentDetailsComponent,
    AsyncPipe,
    MatCardModule,
    MatChipsModule,
    ProductCardComponent
  ],
  providers: [{ provide: DateAdapter, useClass: RussianDateAdapter }],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})
export class PaymentLayoutComponent implements OnInit {

  paymentProductsForm!: FormGroup;
  // personalDataForm!: FormGroup;
  // paymentDetailsForm!: FormGroup;
  
  readonly cyrillicPattern = /^[а-яёА-ЯЁ\s\-]+$/;
  readonly minLength = 3;

  private storageService = inject(StorageService);
  private sentDataService = inject(DataService);

  toPaymentCards$: Observable<AmountCard[]> = this.storageService.products$;
  private destroy$ = new Subject<void>();
  getTotalPrice = this.storageService.getTotalPrice.bind(this.storageService);

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.paymentProductsForm = this.createForm();
    // this.personalDataForm = this.createPersonalDataForm();
    // this.paymentDetailsForm = this.createPaymentDetailsForm();
  }


  private createForm(): FormGroup {
    return this.fb.group({
      personalDataForm: this.fb.group({
        lastName: ['',
          [
            Validators.required,
            Validators.minLength(this.minLength),
            Validators.pattern(this.cyrillicPattern),
          ],
        ],
        firstName: ['',
          [
            Validators.required,
            Validators.minLength(this.minLength),
            Validators.pattern(this.cyrillicPattern),
          ],
        ],
        noMiddleName: [false],
        middleName: ['',
          [
            Validators.required,
            Validators.minLength(this.minLength),
            Validators.pattern(this.cyrillicPattern),
          ],
        ],
        birthDate: ['', [Validators.required, dateValidator()]],
        contacts: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required]],
        }),
      }),
      paymentDetailsForm: this.fb.group({
        wayToPay: ['', [Validators.required]],
        cardNumber: ['', [Validators.required, Validators.minLength(16)]],
        leaveDoor: [false],
        address: this.fb.group({
          city: ['', [Validators.required, Validators.maxLength(100)]],
          street: ['', [Validators.required, Validators.maxLength(100)]],
          house: ['', [Validators.required]],
          flat: ['', [Validators.required]],
        }),
      })
    })
  }

  get personalDataForm() {
    return this.paymentProductsForm.get('personalDataForm') as FormGroup;
  }

   get paymentDetailsForm() {
    return this.paymentProductsForm.get('paymentDetailsForm') as FormGroup;
  }

  // createPersonalDataForm(): FormGroup {
  //   return this.fb.group({
  //     lastName: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(this.minLength),
  //         Validators.pattern(this.cyrillicPattern),
  //       ],
  //     ],
  //     firstName: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(this.minLength),
  //         Validators.pattern(this.cyrillicPattern),
  //       ],
  //     ],
  //     noMiddleName: [false],
  //     middleName: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(this.minLength),
  //         Validators.pattern(this.cyrillicPattern),
  //       ],
  //     ],
  //     birthDate: ['', [Validators.required, dateValidator()]],
  //     contacts: this.fb.group({
  //       email: ['', [Validators.required, Validators.email]],
  //       phone: ['', [Validators.required]],
  //     }),
  //   });
  // }

  // createPaymentDetailsForm(): FormGroup {
  //   return this.fb.group({
  //     wayToPay: ['', [Validators.required]],
  //     cardNumber: ['', [Validators.required, Validators.minLength(16)]],
  //     leaveDoor: [false],
  //     address: this.fb.group({
  //       city: ['', [Validators.required, Validators.maxLength(100)]],
  //       street: ['', [Validators.required, Validators.maxLength(100)]],
  //       house: ['', [Validators.required]],
  //       flat: ['', [Validators.required]],
  //     }),
  //   });
  // }

  onSubmit() {
    if (this.personalDataForm.valid && this.paymentDetailsForm.valid) {
      let phone = this.personalDataForm.get('contacts.phone')?.value;

      if (phone.length <= 10) {
        phone = '7' + this.personalDataForm.get('contacts.phone')?.value;
      }

      const productArray = this.storageService.productValue.map((product) => ({
        id: product.id,
        count: product.count,
      }));

      const unionData: BuyProduct = {
        personalData: {
          ...this.personalDataForm.value,
          contacts: {
            ...this.personalDataForm.value.contacts,
            phone: phone,
          },
        },
        paymentData: this.paymentDetailsForm.value,
        productData: productArray,
      };
      this.sentDataService
        .saveData(unionData)
        .pipe(
          tap(() => {
            this.storageService.clearBasket();
            this.router.navigate(['basket', 'history']);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
