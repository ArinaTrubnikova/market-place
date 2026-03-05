import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../services/storage.service';
import { AmountCard } from '../../product-component/interfaces/product-card.model';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../common/components/product-card/product-card';
import { CardTypes } from '../../common/enum/card-types.enum';

@Component({
  selector: 'basket-component',
  imports: [AsyncPipe, RouterLink, ProductCardComponent, MatButtonModule],
  templateUrl: './basket.html',
  styleUrl: './basket.scss',
})
export class BasketComponent {
  private storageService = inject(StorageService);
  cards$: Observable<AmountCard[]> = this.storageService.products$;

  cardTypes = CardTypes;

  get hasItemsInCart(): boolean {
    return this.storageService.productValue.length > 0;
  }
}
