import { Injectable } from "@angular/core";
import { AmountCard, Card } from "../interface/product-card.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
}
)

export class StorageService {

    private _productsBasket$ = new BehaviorSubject<AmountCard[]>([]);
    public products$ = this._productsBasket$.asObservable();

    addProduct(addedProduct: Card): void {

        if (this.productValue.find((card: AmountCard) => card.id === addedProduct.id)) {
            const products = this.productValue.map((card: AmountCard) => {
                if (card.id === addedProduct.id) {
                    return { ...card, count: card.count += 1 };
                } else {
                    return card;
                }
            });
            this._productsBasket$.next(products);
        } else {
            this._productsBasket$.next([...this.productValue, new AmountCard(addedProduct)]);
        }

    }

    reduceAmountProduct(reducedProduct: Card): void {

        const existingProduct = this.productValue.find((card: AmountCard) => card.id === reducedProduct.id)

        if (existingProduct!.count > 1) {
            const products = this.productValue.map((card: AmountCard) =>
                card.id === reducedProduct.id ? { ...card, count: card.count -= 1 } : card
            )
            this._productsBasket$.next(products);
        }

        else {
            this.deleteProduct(reducedProduct.id);

        }
    }

    get productValue(): AmountCard[] {
        return this._productsBasket$.getValue();
    }

    deleteProduct(id: number) {

        if (this.productValue.find((card: AmountCard) => card.id === id)) {
            const deletedCard = this.productValue.filter((card: AmountCard) => card.id !== id)

            return this._productsBasket$.next(deletedCard)
        } else {

            return this.productValue
        }

    }

}