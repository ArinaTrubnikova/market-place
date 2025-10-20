import { Component } from "@angular/core";
import { RouterOutlet, RouterLink} from "@angular/router";

@Component({
    selector: 'basket-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    templateUrl: './basket-layout.html',
    styleUrl: './basket-layout.scss'
})

export class BasketLayout {

}