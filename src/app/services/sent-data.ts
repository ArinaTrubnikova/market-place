import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BuyProduct } from "../interface/buy-product.model";
import { Observable, of } from "rxjs";

@Injectable()

export class SentDataService {

    private sentUrl = '';
    private requestBuyProducts!: Observable<BuyProduct>;

    constructor(private http: HttpClient) { }

    sentData(products: BuyProduct) {
        this.requestBuyProducts = of(products);
        console.log(this.requestBuyProducts);
    }

    getHistoryBuyProducts(): Observable<BuyProduct> {
        return this.requestBuyProducts;
    }

}

