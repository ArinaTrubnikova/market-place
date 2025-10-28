import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { isValid, parse } from "date-fns";
import { ru } from "date-fns/locale";

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const controlValue = control.value;
        console.log(controlValue);

        if (!controlValue) {
            return null;
        }
        const today = new Date();
        let inputDate: Date;
        if (typeof controlValue === 'string') {
            inputDate = parse(controlValue, 'dd.MM.yyyy', new Date(), { locale: ru });
        } else if (controlValue instanceof Date) {
            inputDate = new Date(controlValue);
        } else {
            return { invalidDate: { value: controlValue } };
        }
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
        } else if (inputDate > minAgeDate) {
            return {
                minAge: {
                    value: controlValue
                }
            };
        } else if (inputDate < maxAgeDate) {
            return {
                maxAge: {
                    value: controlValue
                }
            };
        }
        return null;
    }
}
