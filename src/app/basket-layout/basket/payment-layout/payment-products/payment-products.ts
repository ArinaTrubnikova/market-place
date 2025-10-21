import { Component } from "@angular/core";
import { Observable } from 'rxjs';
import { AmountCard } from "../../../../interface/product-card.model";
import { StorageService } from "../../../../services/storage.service";
import { AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: 'payment-products',
    imports: [AsyncPipe, CurrencyPipe],
    standalone: true,
    templateUrl: './payment-products.html',
    styleUrl: './payment-products.scss'
})

export class PaymentProductsComponent {

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

