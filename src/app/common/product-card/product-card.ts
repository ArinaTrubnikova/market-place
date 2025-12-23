import { Component, inject, Input, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StorageService } from '../../services/storage.service';
import { GetProductService } from '../../product-component/services/get-product.service';
import { Card } from '../../product-component/interfaces/product-card.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-card',
  templateUrl: 'product-card.html',
  styleUrl: 'product-card.scss',
  imports: [MatCardModule, CurrencyPipe],
})
export class ProductCardComponent {
  @Input() products: Card[] = [];
  isModalShow = output<boolean>();

  constructor() {}

  showModal(elem: boolean) {
    this.isModalShow.emit(elem);
  }
}
