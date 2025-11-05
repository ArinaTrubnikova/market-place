import { Directive, OnDestroy, OnInit } from "@angular/core";
import { NgControl } from "@angular/forms";
import { map, Subscription, tap } from "rxjs";

@Directive({
    selector: '[upperCaseFormat]',
    standalone: true,
})

export class UpperCaseFormatDirective implements OnInit, OnDestroy  {

    private subscription: Subscription = new Subscription();

    constructor(private ngControl: NgControl) { }

    ngOnInit() {
        this.toUpper()
    }

    toUpper(): void {

        if (this.ngControl.control) {
          this.subscription.add(this.ngControl.control.valueChanges.pipe(
                map((value: string) => {
                    if (value && value.length > 0) {
                        return value[0].toUpperCase() + value.slice(1)
                    }
                    return value;
                }),
                tap(transformedValue => {
                    this.ngControl.control!.setValue(transformedValue, { emitEvent: false })
                })
            ).subscribe())
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}