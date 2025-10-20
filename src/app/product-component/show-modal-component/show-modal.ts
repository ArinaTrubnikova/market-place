import { Component, Input, output } from "@angular/core";
import { AmountCard, Card } from "../../interface/interface.model";

@Component({
    selector: 'show-modal',
    imports: [],
    templateUrl: './show-modal.html',
    styleUrl: './show-modal.scss',
})

export class ShowModal {

    @Input() isVisible: boolean = false;
    @Input() selectedCard!: Card;
    @Input() productCount!: number;
    isModalClosed = output<void>();
    isProductSelected = output<Card>();
    productCountChange = output<number>();

    hideModal() {
        this.isVisible = false;
        this.isModalClosed.emit();
    }

    addProduct(product: Card): void {
        this.isProductSelected.emit(product);
    }

    getCount(): number {
        return this.productCount;
    }
}



