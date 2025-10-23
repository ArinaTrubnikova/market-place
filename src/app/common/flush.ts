import { FormGroup } from "@angular/forms";

export function flushValue(form: FormGroup, controlName: string) {
    
    const control = form.get(controlName)
    
    if(control) {
        if(control?.value !== '') {
            control?.reset();
            control?.markAsUntouched();
        } else {
            control?.markAsTouched();
        }
    }
}