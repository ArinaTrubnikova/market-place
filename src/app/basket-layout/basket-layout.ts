import { Component } from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";
import { MatAnchor, MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'basket-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, MatAnchor, MatButtonModule],
    templateUrl: './basket-layout.html',
    styleUrl: './basket-layout.scss'
})

export class BasketLayoutComponent {

}