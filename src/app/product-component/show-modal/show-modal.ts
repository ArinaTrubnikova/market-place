import { Component, inject, Input, output } from '@angular/core';
import { Card, type AmountCard } from '../interfaces/product-card.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../common/product-card/product-card';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'show-modal',
  imports: [MatCardModule, MatButtonModule, ProductCardComponent],
  templateUrl: './show-modal.html',
  styleUrl: './show-modal.scss',
})
export class ShowModal {
  private storageService: StorageService = inject(StorageService);
  
  @Input() isVisible: boolean = false;
  @Input() selectedCard!: Card;
  @Input() productCount!: number;
  isVisibleChange = output<void>();
  isProductSelected = output<Card>();
  productCountChange = output<number>();

  hideModal = () => this.isVisibleChange.emit();

  addProduct = (product: Card): void => this.isProductSelected.emit(product);

  getCount(cardId: number): number {
    const product = this.storageService.productValue.find(
      (product: AmountCard) => product.id === cardId
    );
    return product ? product.count : 0;
  }
}
