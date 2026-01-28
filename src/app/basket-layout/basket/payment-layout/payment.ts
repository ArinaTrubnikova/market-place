import { Component, inject, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { PersonalDataComponent } from './personal-data/personal-data';
import { PaymentDetailsComponent } from './payment-details/payment-details';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../../services/sent-data.service';
import { StorageService } from '../../../services/storage.service';
import { BuyProduct, BuyProductForm } from '../interfaces/buy-product.model';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { AmountCard } from '../../../product-component/interfaces/product-card.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { RussianDateAdapter } from '../../../common/date-adapter';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCardComponent } from '../../../common/product-card/product-card';
import { CardSale } from '../interfaces/card-sale.model';

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
    CurrencyPipe,
    MatCardModule,
    MatChipsModule,
    ProductCardComponent
  ],
  providers: [{ provide: DateAdapter, useClass: RussianDateAdapter }],
  templateUrl: './payment.html',
  styleUrl: './payment.scss',
})

export class PaymentLayoutComponent implements OnInit {

  paymentForm!: FormGroup<BuyProductForm>;
  private storageService = inject(StorageService);
  private sentDataService = inject(DataService);
  toPaymentCards$: Observable<AmountCard[]> = this.storageService.products$;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.paymentForm = BuyProductForm.create();
  }

  get personalDataForm() {
    return this.paymentForm.controls.personalData;
  }

  get paymentDetailsForm() {
    return this.paymentForm.controls.paymentData;
  }

  onSubmit() {
    if (this.personalDataForm?.valid && this.paymentDetailsForm?.valid) {
      let phone = this.personalDataForm.controls.contacts.controls.phone.value;

      if (phone && phone.length <= 10) {
        phone = '7' + this.personalDataForm.controls.contacts.controls.phone.value;
      }

      const productArray = this.storageService.productValue.map((product: CardSale) => ({
        id: product.id,
        count: product.count,
      }));

      const unionData = new BuyProduct(this.paymentForm.value as BuyProduct);
      
      this.sentDataService
        .sentData(unionData)
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

  getTotalPrice() {
    return this.storageService.productValue.reduce(
      (total, product) => total + product.cost * product.count,
      0
    );
  }
}
