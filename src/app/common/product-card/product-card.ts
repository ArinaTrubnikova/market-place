import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AmountCard, Card } from '../../product-component/interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrl: 'product-card.scss',
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, MatIconModule],
})
export class ProductCardComponent {
  @Input() products: any[] = [];
  @Input() getCountFn!: (id: number) => number;
  @Input() showImage: boolean = true;
  @Input() showProductsBtns: boolean = true;
  @Input() showBasketBtns: boolean = true;
  isModalShow = output<Card>();
  isAddedProduct = output<any>();
  isReducedAmountProduct = output<AmountCard>();
  isDeletedCard = output<number>();

  constructor() {}

  showModal(product: Card) {
    this.isModalShow.emit(product);
  }

  addProduct(product: any) {
    this.isAddedProduct.emit(product);
  }

  reduceAmountProduct(product: AmountCard) {
    this.isReducedAmountProduct.emit(product);
  }

  deleteCard(productId: number) {
    this.isDeletedCard.emit(productId);
  }
}
