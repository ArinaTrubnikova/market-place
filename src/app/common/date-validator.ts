import type { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DateValidator {
    static dateValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const controlValue = control.value;
            console.log('Date validator called with:', controlValue);
            if (!controlValue) {
                return null;
            }
            const today = new Date();
            const inputDate = new Date(controlValue);
            today.setHours(0, 0, 0, 0);
            inputDate.setHours(0, 0, 0, 0);

            if (inputDate > today) {
                return {
                    futureDate: {
                        value: controlValue,
                        message: 'Дата не может быть в будущем'
                    }
                };
            }
            return null
        }
    }
}