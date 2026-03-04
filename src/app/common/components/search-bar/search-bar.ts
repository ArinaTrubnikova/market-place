import { Component, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, Subject, takeUntil } from "rxjs";
import { SearchForm } from "../../../basket-layout/basket/interfaces/search.model";

@Component({
    selector: 'search-bar',
    standalone: true,
    templateUrl: './search-bar.html',
    styleUrl: './search-bar.scss',
    imports: [ReactiveFormsModule],
})

export class SearchBarComponent {
    form!: FormGroup<SearchForm>;

    searchChange = output<string>();
    private destroy$ = new Subject<void>();

    ngOnInit() {
        this.form = new FormGroup<SearchForm>({
            inputSearch: new FormControl('', { nonNullable: true }),
        });

        this.form.controls.inputSearch.valueChanges.pipe(
            debounceTime(500),
            takeUntil(this.destroy$)
        )
        .subscribe(value => {
            this.searchChange.emit(value);
        })
    }

    clearInput() {
        this.form.controls.inputSearch.setValue('');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}