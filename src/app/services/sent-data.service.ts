import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BuyProduct } from "../basket-layout/basket/interfaces/buy-product.model";
import { BehaviorSubject, Observable, of, switchMap, timer } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {

    private sentUrl = '';
    private requestBuyProducts$ = new BehaviorSubject<BuyProduct[]>([]);
    public historyPurchase$ = this.requestBuyProducts$.asObservable();

    constructor(private http: HttpClient) { }

    sentData(products: BuyProduct): Observable<any> {
        const buyProducts = this.requestBuyProducts$.value;
        buyProducts.push(products);
        this.requestBuyProducts$.next(buyProducts);
        return timer(3000);
    }

    getHistoryBuyProducts(): Observable<BuyProduct[]> {
        console.log(this.requestBuyProducts$);
        return this.requestBuyProducts$;
    }

}

