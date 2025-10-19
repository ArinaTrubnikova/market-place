import { Routes } from '@angular/router';
import { BasketComponent } from './basket-component/basket';
import { ProductComponent } from './product-component/product';

export const routes: Routes = [
    { path: 'basket', component: BasketComponent },
    { path: 'products', component: ProductComponent}
];
