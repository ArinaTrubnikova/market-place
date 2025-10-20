import { Routes } from '@angular/router';
import { BasketLayout } from './basket-layout/basket-layout';

export const routes: Routes = [
    {
        path: 'basket',
        component: BasketLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./basket-layout/basket/basket').then(m => m.BasketComponent)
            },
            {
                path: 'buy',
                loadComponent: () => import('./basket-layout/payment/payment').then(m => m.PaymentComponent)
            }
        ]
    },
    {
        path: 'products',
        loadComponent: () => import('./product-component/product').then(m => m.ProductComponent)
    },
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: '**', redirectTo: '/products' }
];
