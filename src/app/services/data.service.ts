import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BuyProduct } from "../basket-layout/basket/interfaces/buy-product.model";
import { BehaviorSubject, Observable, timer } from "rxjs";
import { Card } from "../product-component/interfaces/product-card.model";

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private apiUrl = 'data/products.json';
    private sentUrl = '';
    private requestBuyProducts$ = new BehaviorSubject<BuyProduct[]>([]);
    public historyPurchase$ = this.requestBuyProducts$.asObservable();

    constructor(private http: HttpClient) { }

    getProduct = () => this.http.get<Card[]>(this.apiUrl);

    sentData(products: BuyProduct): Observable<any> {
        const buyProducts = this.requestBuyProducts$.value;
        buyProducts.push(products);
        this.requestBuyProducts$.next(buyProducts);
        return timer(2000);
    }

    getHistoryBuyProducts(): Observable<BuyProduct[]> {
        console.log(this.requestBuyProducts$);
        return this.requestBuyProducts$;
    }

}

