import { FormGroup } from "@angular/forms";

export function flushValue(form: FormGroup, controlName: string, formGroupName?: string) {

    const childControl = form.get(formGroupName!)

    const control = form.get(controlName) || childControl?.get(controlName)
    
    if(control) {
        if(control?.value !== '') {
            control?.reset();
            control?.markAsUntouched();
        } else {
            control?.markAsTouched();
        }
    }
}