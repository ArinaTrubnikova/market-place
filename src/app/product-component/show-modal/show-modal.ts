import { StorageService } from './../../services/storage.service';
import { Component, inject, Input, output } from '@angular/core';
import { AmountCard, Card } from '../interfaces/product-card.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent } from '../../common/components/product-card/product-card';
import { CardTypes } from '../../common/enum/card-types.enum';

@Component({
  selector: 'show-modal',
  imports: [MatCardModule, MatButtonModule, ProductCardComponent],
  templateUrl: './show-modal.html',
  styleUrl: './show-modal.scss',
})
export class ShowModal {
  @Input() isVisible: boolean = false;
  @Input() selectedCard!: Card;

  isVisibleChange = output<boolean>();
  isProductSelected = output<Card>();
  cardTypes = CardTypes;

  hideModal = () => this.isVisibleChange.emit(false);
}
