import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'basket-layout',
    standalone: true,
    imports: [RouterOutlet, MatButtonModule],
    templateUrl: './basket-layout.html',
    styleUrl: './basket-layout.scss'
})

export class BasketLayoutComponent { }