import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GetProductService } from "../services/get-product.service";
import { Card, AmountCard } from "../interface/interface.model";
import { StorageService } from "../services/storage.service";
import { ShowModal } from "./show-modal-component/show-modal";

@Component({
    selector: 'product-component',
    imports: [RouterOutlet, ShowModal],
    templateUrl: './product.html',
    styleUrl: './product.scss',
    providers: [GetProductService]
})

export class ProductComponent {
    selectedCard!: Card;
    isModalVisible: boolean = false;
    products: Card[] = [];

    constructor(private getProductService: GetProductService,
        private storageService: StorageService) { }

    ngOnInit() {
        this.getProduct();
    }

    showModal(product: Card) {
        this.selectedCard = product
        this.isModalVisible = true;
    }

    hideModal() {
        this.isModalVisible = false
    }


    getCount(cardId: number): number {
        const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardId);
        return product ? product.count : 0;
    }

    getProduct() {
        this.getProductService.getProduct().subscribe(
            {
                next: (data) => {
                    this.products = data;
                }
            }
        )
    }

    addProduct(product: Card): void {
        this.storageService.addProduct(product);
    }
}