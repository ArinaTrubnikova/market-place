import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const inputDate = control.value;

    if (!inputDate) {
      return null;
    }
    inputDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const minAgeDate = new Date();
    minAgeDate.setFullYear(today.getFullYear() - 18);
    const maxAgeDate = new Date();
    maxAgeDate.setFullYear(today.getFullYear() - 75);

    if (inputDate > today) {
      return {
        futureDate: {
          value: inputDate,
        },
      };
    } else if (inputDate > minAgeDate) {
      return {
        minAge: {
          value: inputDate,
        },
      };
    } else if (inputDate < maxAgeDate) {
      return {
        maxAge: {
          value: inputDate,
        },
      };
    }
    return null;
  };
}
