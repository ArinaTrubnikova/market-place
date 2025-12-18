import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/sent-data.service';
import { BuyProduct } from '../interfaces/buy-product.model';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { GetProductService } from '../../../product-component/services/get-product.service';
import { Card } from '../../../product-component/interfaces/product-card.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'purchase-history',
  imports: [AsyncPipe, CurrencyPipe, MatCardModule],
  templateUrl: './purchase-history.html',
  providers: [],
  styleUrl: './purchase-history.scss',
})
export class PurchaseHistoryComponent {
  private dataService: DataService = inject(DataService);
  private getProductService: GetProductService = inject(GetProductService);
  public purchaseHistoryCard$!: Observable<any>;
  totalPrice: number = 0;

  ngOnInit() {
    this.purchaseHistoryCard$ = combineLatest([
      this.dataService.historyPurchase$,
      this.getProductService.getProduct(),
    ]).pipe(
      map(([productsBuy, productsCard]: [BuyProduct[], Card[]]) => {
        const cardsProduct = new Map();
        productsCard.forEach((card) => {
          const { id, ...cardInfo } = card;
          cardsProduct.set(id, { ...card });
        });

        this.totalPrice = productsBuy.reduce(
          (total, buy) =>
            total +
            buy.productData.reduce((sum, product) => {
              const card = cardsProduct.get(product.id);
              return sum + product.count * (card?.cost || 0);
            }, 0),
          0
        );

        return productsBuy.map((buy) => {
          const products = buy.productData.map((product) => {
            return {
              ...cardsProduct.get(product.id),
              count: product.count,
            };
          });

          return {
            ...buy,
            productData: products,
          };
        });
      })
    );
    console.log(this.purchaseHistoryCard$);

    this.getTotalPrice();
  }

  getTotalPrice() {
    this.purchaseHistoryCard$.pipe(
      map((buy: BuyProduct) =>
        buy.productData.reduce(
          (total: number, product: any) => total + product.count * product.cost,
          0
        )
      )
    ).subscribe(data => this.totalPrice = data);
  }
}
