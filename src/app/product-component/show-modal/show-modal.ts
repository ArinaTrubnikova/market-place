import { Component, Input, output } from '@angular/core';
import { Card } from '../interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'show-modal',
  imports: [CurrencyPipe, MatCardModule, MatButtonModule],
  templateUrl: './show-modal.html',
  styleUrl: './show-modal.scss',
})
export class ShowModal {
  @Input() isVisible: boolean = false;
  @Input() selectedCard!: Card;
  @Input() productCount!: number;
  isVisibleChange = output<void>();
  isProductSelected = output<Card>();
  productCountChange = output<number>();

  hideModal = () => this.isVisibleChange.emit();

  addProduct = (product: Card): void => this.isProductSelected.emit(product);
}
