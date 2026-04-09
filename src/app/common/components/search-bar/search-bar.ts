import { Component, DestroyRef, inject, output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs";
import { SearchForm } from "../../interfaces/search.model";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.form = new FormGroup<SearchForm>({
            inputSearch: new FormControl('', { nonNullable: true }),
        });

        this.form.controls.inputSearch.valueChanges.pipe(
            debounceTime(500),
            takeUntilDestroyed(this.destroyRef)
        )
            .subscribe(value => {
                console.log(value)
                this.searchChange.emit(value);
            })
    }

    clearInput() {
        this.form.controls.inputSearch.setValue('');
    }
}