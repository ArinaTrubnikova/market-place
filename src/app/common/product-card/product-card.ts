import { Component, Input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../../product-component/interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrl: 'product-card.scss',
  imports: [MatCardModule, CurrencyPipe, MatButtonModule],
})
export class ProductCardComponent {
  @Input() products: Card[] = [];
  @Input() getCountFn!: (id: number) => number; 
  isModalShow = output<Card>();
  isAddedProduct = output<Card>();

  constructor() { }

  showModal(product: Card) {
    this.isModalShow.emit(product);
  }

  addProduct(product: Card) {
    this.isAddedProduct.emit(product);
  }
}
