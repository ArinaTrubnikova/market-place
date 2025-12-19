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
  styleUrl: './purchase-history.scss',
})
export class PurchaseHistoryComponent {
  private dataService: DataService = inject(DataService);
  private getProductService: GetProductService = inject(GetProductService);
  public purchaseHistoryCard$!: Observable<any>;

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
