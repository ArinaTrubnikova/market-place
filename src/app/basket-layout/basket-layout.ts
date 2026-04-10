import { Component } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'basket-layout',
    standalone: true,
    imports: [RouterOutlet, MatButtonModule],
    templateUrl: './basket-layout.html',
    styleUrl: './basket-layout.scss'
})

export class BasketLayoutComponent {
    constructor(public router: Router) { }
}