import { StorageService } from './../services/storage.service';
import { Component, inject } from '@angular/core';
import { Card } from './interfaces/product-card.model';
import { ShowModal } from './show-modal/show-modal';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from '../common/product-card/product-card';
import { DataService } from '../services/data.service';

@Component({
  selector: 'product-component',
  imports: [ShowModal, ProductCardComponent],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  private storageService: StorageService = inject(StorageService);
  private dataService: DataService = inject(DataService);

  selectedCard!: Card;
  isModalVisible: boolean = false;
  products: Card[] = [];
  countInProducts = this.storageService.getCount.bind(this.storageService);

  private productSubscription?: Subscription;

  constructor() { }

  ngOnInit() {
    this.getProduct();
  }

  showModal(product: Card) {
    this.selectedCard = product;
    this.isModalVisible = true;
  }

  getProduct() {
    this.productSubscription = this.dataService.getProduct().subscribe((data: Card[]) => {
      this.products = data;
    });
  }

  addProduct(product: Card): void {
    this.storageService.addProduct(product);
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
  }
}
