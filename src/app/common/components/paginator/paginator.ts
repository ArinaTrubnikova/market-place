import { Component, Input, output, type SimpleChanges } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";

@Component({
    selector: 'app-paginator',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './paginator.html',
    styleUrl: './paginator.scss'
})

export class PaginatorComponent {
    @Input() totalItems = 0;
    @Input() itemsPerPage = 3;
    @Input() currentPage = 1;
    pages: number[] = [];
    pageChange = output<number>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['totalItems'] && this.totalItems > 0) {
            this.updatePages();
        }
    }

    updatePages() {
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    get totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
    }

    goToPage(page: number) {
        if (page < 1 || page > this.totalPages) return;
        this.pageChange.emit(page);
    }

    nextPage() {
        this.goToPage(this.currentPage + 1);
    }

    prevPage() {
        this.goToPage(this.currentPage - 1);
    }
}