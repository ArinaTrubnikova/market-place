import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { StorageService } from "../../services/storage.service";
import { GetProductService } from "../../services/get-product.service";
import { AmountCard } from "../../interface/product-card.model";
import { Observable } from "rxjs/internal/Observable";
import { AsyncPipe, CurrencyPipe } from "@angular/common";


@Component({
  selector: 'basket-component',
  imports: [AsyncPipe, RouterLink, CurrencyPipe],
  providers: [GetProductService],
  templateUrl: './basket.html',
  styleUrl: './basket.scss'
})

export class BasketComponent {

  private storageService = inject(StorageService);

  cards$: Observable<AmountCard[]> = this.storageService.products$;

  get hasItemsInCart(): boolean {
    return this.storageService.productValue.length > 0;
  }

  addProduct(product: AmountCard): void { this.storageService.addProduct(product); }

  reduceAmountProduct(product: AmountCard): void { this.storageService.reduceAmountProduct(product); }

  deleteCard(id: number) { this.storageService.deleteProduct(id); }
}