import { StorageService } from './../services/storage.service';
import { Component, inject } from '@angular/core';
import { GetProductService } from './services/get-product.service';
import { AmountCard, Card } from './interfaces/product-card.model';
import { ShowModal } from './show-modal/show-modal';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from '../common/product-card/product-card';

@Component({
  selector: 'product-component',
  imports: [ShowModal, ProductCardComponent],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  providers: [GetProductService],
})
export class ProductComponent {
  private storageService: StorageService = inject(StorageService);
  private getProductService: GetProductService = inject(GetProductService);
  selectedCard!: Card;
  isModalVisible: boolean = false;
  products: Card[] = [];
  // countInProducts = this.storageService.getCount.bind(this.storageService);
  private productSubscription?: Subscription;

  constructor() { }

  ngOnInit() {
    this.getProduct();
  }

  showModal(product: Card) {
    this.selectedCard = product;
    this.isModalVisible = true;
  }

  getCount(cardId: number): number {
    const product = this.storageService.productValue.find(
      (product: AmountCard) => product.id === cardId
    );
    return product ? product.count : 0;
  }

  getProduct() {
    this.productSubscription = this.getProductService.getProduct().subscribe((data: Card[]) => {
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
