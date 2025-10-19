import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { ProductComponent } from './product-component/product';
import { BasketComponent } from './basket-layout/basket-component/basket';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('markeplace');

  constructor(public router: Router) {}
}
