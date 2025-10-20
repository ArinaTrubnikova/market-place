import { Component } from "@angular/core";
import { map, Observable } from 'rxjs';
import { Card, AmountCard } from "../../interface/product-card.model";
import { StorageService } from "../../services/storage.service";
import { AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: 'payment-component',
    imports: [AsyncPipe, CurrencyPipe],
    standalone: true,
    templateUrl: './payment.html',
    styleUrl: './payment.scss'
})

export class PaymentComponent {

    toPaymentCards$!: Observable<AmountCard[]>;

 
    constructor(private storageService: StorageService) { }

    ngOnInit() {
        this.toPaymentCards$ = this.storageService.products$;
    }

    getTotalPrice() {
       return this.storageService.productValue.reduce((total, product) => {
            return total + (product.cost * product.count);
        }, 0);
    }

}

