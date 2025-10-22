import type { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DateValidator {
    static dateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            let controlValue = control.value;
            console.log('Date validator called with:', controlValue);
            if (!controlValue) {
                return null;
            }
            const today = new Date();
            const inputDate = new Date(controlValue);
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);
            const minAgeDate = new Date();
            const maxAgeDate = new Date();
            minAgeDate.setFullYear(today.getFullYear() - 18);
            maxAgeDate.setFullYear(today.getFullYear() - 75);

            if (inputDate > today) {
                return {
                    futureDate: {
                        value: controlValue
                    }
                };
            } else if (minAgeDate < inputDate) {
                return {
                    minAge: {
                        value: controlValue
                    }
                }
            } else if (maxAgeDate > inputDate) {
                return {
                    maxAge: {
                        value: controlValue
                    }
                }
            }
            return null
        }
    }
}