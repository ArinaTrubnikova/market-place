import { Component, inject, input, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AmountCard, Card } from '../../../product-component/interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { StorageService } from '../../../services/storage.service';
import { CardTypes } from '../../enum/card-types.enum';

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
  private readonly storageService = inject(StorageService);

  @Input({ required: true }) card!: Card | AmountCard;
  @Input({ required: true }) cardTypes!: CardTypes;
  CARD_TYPES = CardTypes;
  isModalShow = output<Card>();
  isClosedModal = output<void>();

  addProduct(product: Card): void {
    this.storageService.addProduct(product);
  }

  reduceAmountProduct(product: Card | AmountCard): void {
    this.storageService.reduceAmountProduct(product);
  }

  deleteCard(id: number) {
    this.storageService.deleteProduct(id);
  }

  showModal(product: Card) {
    this.isModalShow.emit(product);
  }

  closeModal() {
    this.isClosedModal.emit();
  }

  getCount(cardId: number): number {
    const product = this.storageService.productValue.find(
      (product: AmountCard) => product.id === cardId
    );
    return product ? product.count : 0;
  }
}
