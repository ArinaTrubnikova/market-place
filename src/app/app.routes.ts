import { Routes } from '@angular/router';
import { BasketLayoutComponent } from './basket-layout/basket-layout';
import { DataService } from './services/sent-data.service';

export const routes: Routes = [
    {
        path: 'basket',
        component: BasketLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./basket-layout/basket/basket').then(m => m.BasketComponent)
            },
            {
                path: 'buy',
                loadComponent: () => import('./basket-layout/basket/payment-layout/payment').then(m => m.PaymentLayoutComponent),
            },
            {
                path: 'history',
                loadComponent: () => import('./basket-layout/basket/purchase-history/purchase-history').then(m => m.PurchaseHistoryComponent)
            }
        ]
    },
    {
        path: 'products',
        loadComponent: () => import('./product-component/product').then(m => m.ProductComponent)
    },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products' },
];
