import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from '../interfaces/product-card.model';

@Injectable({
    providedIn: 'root'
})

export class GetProductService {

    private apiUrl = 'data/products.json';

    constructor(private http: HttpClient) { }

    getProduct = () => this.http.get<Card[]>(this.apiUrl)

}