import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GetProductService } from "../services/get-product.service";
import { Card, AmountCard } from "../interface/product-card.model";
import { StorageService } from "../services/storage.service";
import { ShowModal } from "./show-modal/show-modal";
import { CurrencyPipe } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: 'product-component',
    imports: [RouterOutlet, ShowModal, CurrencyPipe],
    templateUrl: './product.html',
    styleUrl: './product.scss',
    providers: [GetProductService]
})

export class ProductComponent {

    selectedCard!: Card;
    isModalVisible: boolean = false;
    products: Card[] = [];
    private productSubscription?: Subscription;

    constructor(private getProductService: GetProductService,
        private storageService: StorageService) { }

    ngOnInit() {
        this.getProduct();
    }

    showModal(product: Card) {
        this.selectedCard = product
        this.isModalVisible = true;
    }

    hideModal = () => this.isModalVisible = false;

    getCount(cardId: number): number {
        const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardId);
        return product ? product.count : 0;
    }

    getProduct() {
        this.productSubscription = this.getProductService.getProduct().subscribe((data: Card[]) => {
            this.products = data;
        })
    }

    addProduct = (product: Card): void => this.storageService.addProduct(product);

    ngOnDestroy() {
        this.productSubscription?.unsubscribe()
    }
}