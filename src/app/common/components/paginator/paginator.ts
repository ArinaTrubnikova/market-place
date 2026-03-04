import { Component, Input } from "@angular/core";

@Component({
    selector: 'paginator',
    standalone: true,
    templateUrl: './paginator.html',
    styleUrl: './paginator.scss'
})

export class PaginatorComponent {
    @Input() elements = [];
}