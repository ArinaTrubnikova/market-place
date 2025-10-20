import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AmountCard, Card } from '../interface/product-card.model';

@Injectable()

export class GetProductService {
    private apiUrl = 'data/products.json';

    constructor(private http: HttpClient) {

    }

    getProduct() {
        return this.http.get<Card[]>(this.apiUrl)
    }

}