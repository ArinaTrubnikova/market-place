import { StorageService } from './../services/storage.service';
import { Component, inject } from '@angular/core';
import { Card } from './interfaces/product-card.model';
import { ShowModal } from './show-modal/show-modal';
import { Subscription } from 'rxjs';
import { ProductCardComponent } from '../common/components/product-card/product-card';
import { DataService } from '../services/data.service';
import { SearchBarComponent } from "../common/components/search-bar/search-bar";

@Component({
  selector: 'product-component',
  imports: [ShowModal, ProductCardComponent, SearchBarComponent],
  templateUrl: './product.html',
  styleUrl: './product.scss',
})
export class ProductComponent {
  private storageService: StorageService = inject(StorageService);
  private dataService: DataService = inject(DataService);

  selectedCard!: Card;
  isModalVisible: boolean = false;
  products: Card[] = [];
  filteredCards: Card[] = [...this.products];

  countInProducts = this.storageService.getCount.bind(this.storageService);

  private productSubscription?: Subscription;

  constructor() { }

  ngOnInit() {
    this.productSubscription = this.dataService.getProduct().subscribe((data: Card[]) => {
      this.products = data;
      this.filteredCards = [...data];
    });
  }

  showModal(product: Card) {
    this.selectedCard = product;
    this.isModalVisible = true;
  }

  addProduct(product: Card): void {
    this.storageService.addProduct(product);
  }

  onFiltered(value: string) {
    this.dataService.getFilteredProduct(value.toLowerCase()).subscribe(
      res => {
        if (!res) {
          this.filteredCards = [...this.products];
          return;
        }
        this.filteredCards = res;
      }
    )
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
  }
}
