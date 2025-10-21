import { Component, inject, output } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from "@angular/forms";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatFormField, MatInputModule } from "@angular/material/input";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";

@Component({
    selector: 'personal-data',
    imports: [MatInputModule, MatFormField, MatCheckbox, ReactiveFormsModule, CommonModule, NgxMaskDirective],
    standalone: true,
    templateUrl: './personal-data.html',
    providers: [provideNgxMask()],
    styleUrl: './personal-data.scss'
})

export class PersonalDataComponent {

    isFormValidChange = output<boolean>();
    private fb = inject(FormBuilder)
    personalDataForm!: FormGroup;

    constructor() {

        this.personalDataForm = this.createForm();

        this.personalDataForm.statusChanges.subscribe(() => {
            this.isFormValidChange.emit(this.personalDataForm.valid);
        });

    }

    createForm(): FormGroup {
        return this.fb.group({
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/)]],
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/)]],
            noMiddleName: [false],
            middleName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/)]],
            contacts: this.fb.group({
                email: ['', [Validators.required, Validators.email]],
                phone: ['', [Validators.required]]
            })
        });
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
            middleNameControl?.clearValidators();
            middleNameControl?.setValue('');
        } else {
            middleNameControl?.enable();
            middleNameControl?.setValidators([Validators.required, Validators.minLength(3), Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/)]);
        }
        middleNameControl?.updateValueAndValidity();
    }
}