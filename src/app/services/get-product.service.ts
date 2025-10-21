import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Card } from '../interface/product-card.model';

@Injectable()

export class GetProductService {

    private apiUrl = 'data/products.json';

    constructor(private http: HttpClient) { }

    getProduct = () => this.http.get<Card[]>(this.apiUrl)

}