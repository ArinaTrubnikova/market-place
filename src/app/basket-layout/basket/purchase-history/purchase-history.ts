import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { BuyProduct } from '../interfaces/buy-product.model';
import { BehaviorSubject, combineLatest, map, Observable, type Subscription } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Card } from '../../../product-component/interfaces/product-card.model';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../../../common/components/product-card/product-card';

@Component({
  selector: 'purchase-history',
  imports: [AsyncPipe, CurrencyPipe, MatCardModule, ProductCardComponent],
  templateUrl: './purchase-history.html',
  styleUrl: './purchase-history.scss',
})
export class PurchaseHistoryComponent {
  private dataService: DataService = inject(DataService);

  public purchaseHistoryCard$!: Observable<any>;

  private requestBuyProducts$ = new BehaviorSubject<BuyProduct[]>([]);
  public historyPurchase$ = this.requestBuyProducts$.asObservable();

  ngOnInit() {

    this.dataService.getHistoryBuyProducts().subscribe((data: BuyProduct[]) => {
      this.requestBuyProducts$.next(data);
    });

    this.purchaseHistoryCard$ = combineLatest([
      this.historyPurchase$,
      this.dataService.getProduct(),
    ]).pipe(
      map(([productsBuy, productsCard]: [BuyProduct[], Card[]]) => {
        const cardsProduct = new Map();
        productsCard.forEach((card) => {
          const { id, ...cardInfo } = card;
          cardsProduct.set(id, { ...card });
        });

        return productsBuy.map((buy) => {
          const totalPrice = buy.productData.reduce((total, product) => {
            const card = cardsProduct.get(product.id);
            return total + product.count * (card?.cost || 0);
          }, 0);

          const products = buy.productData.map((product) => {
            return {
              ...cardsProduct.get(product.id),
              count: product.count,
            };
          });

          return {
            ...buy,
            productData: products,
            amount: totalPrice,
          };
        });
      })
    );
  }
}
