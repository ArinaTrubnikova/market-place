import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormGroupDirective, type ValidatorFn, type FormControl, type ValidationErrors, type AbstractControl } from "@angular/forms";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { MatNativeDateModule, provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { DateValidator } from "../../../../common/date-validator";

@Component({
    selector: 'personal-data',
    imports: [MatInputModule,
        MatFormField,
        MatCheckbox,
        ReactiveFormsModule,
        CommonModule,
        NgxMaskDirective,
        MatNativeDateModule,
        MatDatepickerModule
    ],
    standalone: true,
    templateUrl: './personal-data.html',
    providers: [provideNgxMask(), provideNativeDateAdapter()],
    styleUrl: './personal-data.scss'
})

export class PersonalDataComponent{

    personalDataForm!: FormGroup;

    constructor(private formGroupDirective: FormGroupDirective) { }

    ngOnInit() {
        this.personalDataForm = this.formGroupDirective.form
    }

    hasError(controlName: string, errorType: string): boolean {

        const control = this.personalDataForm.get(controlName)

        if (!control?.errors || !(control.dirty || control.touched)) {
            return false;
        }
        return control.hasError(errorType);
    }

    checkBoxChange(event: MatCheckboxChange) {

        const isCheked = event.checked
        const middleNameControl = this.personalDataForm.get('middleName')

        if (isCheked) {
            middleNameControl?.disable();
            middleNameControl?.reset();
        } else {
            middleNameControl?.enable();
        }
    }
}