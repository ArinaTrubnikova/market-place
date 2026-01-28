import { FormControl, FormGroup, Validators } from "@angular/forms"
import { dateValidator } from "../../../common/validators/date-validator";

export class PersonalData {
    lastName!: string | null;
    firstName!: string | null;
    middleName!: string | null;
    noMiddleName!: boolean | null;
    birthDate!: Date | null;
    contacts!: {
        email: string | null,
        phone: string | null
    };

    constructor (data?: Partial<PersonalData | null>) {
            const initial = {
                lastName: null,
                firstName: null,
                middleName: null,
                noMiddleName: false,
                birthDate: null,
                contacts: {
                    email: null,
                    phone: null
                },
                ...data,
            }

            this.lastName = initial.lastName;
            this.firstName = initial.firstName;
            this.middleName = initial.middleName;
            this.noMiddleName = initial.noMiddleName;
            this.birthDate = initial.birthDate;
            this.contacts.email = initial.contacts.email;
            this.contacts.phone = initial.contacts.phone;
    }
}
export class PersonalDataForm {
    lastName!: FormControl<string | null>;
    firstName!: FormControl<string | null>;
    middleName!: FormControl<string | null>;
    noMiddleName!: FormControl<boolean | null>;
    birthDate!: FormControl<Date | null>;
    contacts!: FormGroup<{
        email: FormControl<string | null>;
        phone: FormControl<string | null>;
    }>;

    static createForm(data?: PersonalData) {
        return new FormGroup<PersonalDataForm>({
            lastName: new FormControl(data?.lastName || null, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/),
        ]),
            firstName: new FormControl(data?.firstName || null, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/),
        ]),
            middleName: new FormControl(data?.middleName || null, [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[а-яёА-ЯЁ\s\-]+$/),
        ]),
            noMiddleName: new FormControl(data?.noMiddleName || false),
            birthDate: new FormControl(data?.birthDate || null, [Validators.required, dateValidator()]),
            contacts: new FormGroup({
                email: new FormControl(data?.contacts.email || null, [Validators.required, Validators.email]),
                phone: new FormControl(data?.contacts.phone || null, Validators.required),
            }),
        });
    }
}

