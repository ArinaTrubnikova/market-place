import { Component, EventEmitter, Input, Output, type SimpleChanges } from "@angular/core";
import { GetProductService } from "../services/get-product.service";
import { StorageService } from "../services/storage.service";
import { AmountCard, Card } from "../interface/interface.model";
import { Observable } from "rxjs/internal/Observable";
import { AsyncPipe } from "@angular/common";
import { map } from "rxjs";

@Component({
    selector: 'show-modal',
    imports: [AsyncPipe],
    templateUrl: './show-modal.html',
    styleUrl: './show-modal.scss',
})

export class ShowModal {

    @Input() isVisible: boolean = false;
    @Input() selectedCard!: Card;
    @Output() isModalClosed = new EventEmitter<void>();
    @Output() isProductSelected = new EventEmitter<Card>();


    hideModal() {
        this.isVisible = false;
        this.isModalClosed.emit();
    }

    constructor(private storageService: StorageService) { }

    addProduct(product: Card): void {
        this.storageService.addProduct(product);
        this.isProductSelected.emit(product);
    }

    getCount(cardId: number): number {
        const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardId);
        return product ? product.count : 0;
    }
}



