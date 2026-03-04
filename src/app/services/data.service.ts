import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BuyProduct } from "../basket-layout/basket/interfaces/buy-product.model";
import { Card } from "../product-component/interfaces/product-card.model";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DataService {
    private http = inject(HttpClient);

    private apiUrl = 'data/products.json';

    constructor() { }

    getProduct = () => this.http.get<Card[]>(this.apiUrl);

    saveData(products: BuyProduct) {
        return this.http.post('http://localhost:3000/products', products);
    }

    getFilteredProduct(title: string) {
        return this.http.post<Card[]>(this.apiUrl, title).pipe(
            map(cards => title ? cards.filter(card => card.title.toLowerCase() === title) : cards)
        )
    }

    getHistoryBuyProducts = () => this.http.get<BuyProduct[]>('http://localhost:3000/products');
}

