import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AmountCard, Card } from '../../product-component/interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrl: 'product-card.scss',
  imports: [
    MatCardModule, 
    CurrencyPipe, 
    MatButtonModule, 
    MatIconModule, 
    MatChipsModule],
})
export class ProductCardComponent {
  @Input() products: any[] = [];
  @Input() getCountFn!: (id: number) => number;
  @Input() isModal: boolean = true;
  @Input() showProductsBtns: boolean = true;
  @Input() showBasketBtns: boolean = true;
  @Input() closeModalBtn: boolean = true;
  @Input() isForPayment: boolean = true;
  @Input() getTotalPrice!: () => {};
  isModalShow = output<Card>();
  isAddedProduct = output<any>();
  isReducedAmountProduct = output<AmountCard>();
  isDeletedCard = output<number>();
  isClosedModal = output<void>();

  constructor() { }

  addProduct(product: any) {
    this.isAddedProduct.emit(product);
  }

  reduceAmountProduct(product: AmountCard) {
    this.isReducedAmountProduct.emit(product);
  }

  deleteCard(productId: number) {
    this.isDeletedCard.emit(productId);
  }

  showModal(product: Card) {
    this.isModalShow.emit(product);
  }

  closeModal() {
    this.isClosedModal.emit();
  }
}
