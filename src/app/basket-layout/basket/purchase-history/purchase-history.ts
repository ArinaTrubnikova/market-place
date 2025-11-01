import { Component, inject } from '@angular/core';
import { DataService } from '../../../services/sent-data.service';
import { BuyProduct } from '../interfaces/buy-product.model';
import { combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GetProductService } from '../../../product-component/services/get-product.service';

@Component({
  selector: 'purchase-history',
  imports: [AsyncPipe],
  templateUrl: './purchase-history.html',
  providers: [],
  styleUrl: './purchase-history.scss'
})

export class PurchaseHistoryComponent {

  private dataService: DataService = inject(DataService);
  private getProductService: GetProductService = inject(GetProductService);
  public purchaseHistoryCard$!: Observable<any>;


  ngOnInit() {
    this.purchaseHistoryCard$ = combineLatest([
      this.dataService.historyPurchase$,
      this.getProductService.getProduct()
    ])
    .pipe(
      map(([productsBuy: BuyProduct[], productsCard: Card[]]: []) => {
        
        return [{}]
      })
    )
  }

}
