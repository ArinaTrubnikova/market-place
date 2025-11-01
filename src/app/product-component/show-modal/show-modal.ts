import { Component, Input, output } from "@angular/core";
import { Card } from "../interfaces/product-card.model";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: 'show-modal',
    imports: [CurrencyPipe],
    templateUrl: './show-modal.html',
    styleUrl: './show-modal.scss',
})

export class ShowModal {

    @Input() isVisible: boolean = false;
    @Input() selectedCard!: Card;
    @Input() productCount!: number;
    isVisibleChange = output<void>();
    isProductSelected = output<Card>();
    productCountChange = output<number>();

    hideModal = () => this.isVisibleChange.emit();

    addProduct = (product: Card): void => this.isProductSelected.emit(product);
}



