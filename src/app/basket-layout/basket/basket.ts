import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { GetProductService } from "../../services/get-product.service";
import { AmountCard } from "../../interface/product-card.model";
import { Observable } from "rxjs/internal/Observable";
import { AsyncPipe, CurrencyPipe } from "@angular/common";


@Component({
  selector: 'basket-component',
  imports: [RouterOutlet, AsyncPipe, RouterLink, CurrencyPipe],
  providers: [GetProductService],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})

export class BasketComponent {

  cards$!: Observable<AmountCard[]>;

  ngOnInit() {
    this.cards$ = this.storageService.products$;
  }

  getCount(cardId: number): number {
    const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardId);
    return product ? product.count : 0;
  }

  constructor(private storageService: StorageService) { }


  addProduct(product: AmountCard): void {

    this.storageService.addProduct(product);
  }

  reduceAmountProduct(product: AmountCard): void {

    this.storageService.reduceAmountProduct(product);
  }

  deleteCard(id: number) {
    this.storageService.deleteProduct(id)

  }
  
  hasItemsInCart(): boolean {
    return this.storageService.productValue.length > 0;
  }
}