import { StorageService } from './../../services/storage.service';
import { Component, inject, Input, output } from '@angular/core';
import { AmountCard, Card } from '../interfaces/product-card.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../common/product-card/product-card';

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
  isVisibleChange = output<boolean>();
  isProductSelected = output<Card>();
  productCountChange = output<number>();
  
  countInModal = this.storageService.getCount.bind(this.storageService);

  hideModal = () => this.isVisibleChange.emit(false);

  addProduct = (product: Card): void => this.isProductSelected.emit(product);
}
