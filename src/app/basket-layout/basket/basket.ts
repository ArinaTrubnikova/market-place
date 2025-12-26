import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AmountCard } from '../../product-component/interfaces/product-card.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../common/product-card/product-card';

@Component({
  selector: 'basket-component',
  imports: [AsyncPipe, RouterLink, ProductCardComponent, MatButtonModule],
  providers: [],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class BasketComponent {
  private storageService = inject(StorageService);
  cards$: Observable<AmountCard[]> = this.storageService.products$;

  get hasItemsInCart(): boolean {
    return this.storageService.productValue.length > 0;
  }

  addProduct(product: AmountCard): void {
    this.storageService.addProduct(product);
  }

  reduceAmountProduct(product: AmountCard): void {
    this.storageService.reduceAmountProduct(product);
  }

  deleteCard(id: number) {
    this.storageService.deleteProduct(id);
  }
}
