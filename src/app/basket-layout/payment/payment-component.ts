import { Component } from "@angular/core";
import { map, Observable } from 'rxjs';
import { Card, AmountCard } from "../../interface/product-card.model";
import { StorageService } from "../../services/storage.service";
import { AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: 'payment-component',
    imports: [AsyncPipe, CurrencyPipe],
    standalone: true,
    templateUrl: './payment-component.html',
    styleUrl: './payment.scss'
})

export class PaymentComponent {

    toPaymentCards$!: Observable<Card[]>;
    totalPrice!: number;
 
    constructor(private storageService: StorageService) { }

    ngOnInit() {
        this.toPaymentCards$ = this.storageService.products$.pipe(
            map(cards => cards.map(({ id, cost, count, title }) => ({
                id, cost, count, title
            })))
        );
    }

    getCount(cardId: number): number {
        const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardId);
        return product ? product.count : 0;
    }

    getPriceForProduct(cardForPayment: Card): number {

        console.log(this.totalPrice);

        const product = this.storageService.productValue.find((product: AmountCard) => product.id === cardForPayment.id);

        if (product) {
            const price = product.cost
            const amount = product.count
            return this.totalPrice = price * amount
        } else {
            return 0
        }

    }

    getTotalPrice() {
        this.totalPrice = this.storageService.productValue.reduce((total, product) => {
            return total + (product.cost * product.count);
        }, 0);

        return this.totalPrice

    }

}

