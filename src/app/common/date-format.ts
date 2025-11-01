import { Directive, OnDestroy, OnInit } from "@angular/core";
import { NgControl } from "@angular/forms";
import { map, Subscription, tap } from "rxjs";

@Directive({
  selector: '[dateFormat]',
  standalone: true,
})

export class AutoFormatDateDirective implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  constructor(private ngControl: NgControl) { }

  ngOnInit() {
    this.autoFormatDate()
  }

  autoFormatDate(): void {

    if (this.ngControl.control) {
      this.subscription.add(this.ngControl.control.valueChanges.pipe(
        map(value => {
          console.log('map получил value:', value);
          let cleanValue = value.replace(/\./g, '');
          if (cleanValue === null || cleanValue === '') return value = '';
          if (cleanValue.length > 0) {
            if (cleanValue.length <= 2) {
              return cleanValue;
            } else if (cleanValue.length <= 4) {
              return cleanValue = cleanValue.substring(0, 2) + '.' + cleanValue.substring(2);
            } else {
              return cleanValue = cleanValue.substring(0, 2) + '.' + cleanValue.substring(2, 4) + '.' + cleanValue.substring(4, 8);
            }
          }
        }),
        tap(newValue => {
          this.ngControl.control?.setValue(newValue, { emitEvent: false })
        })).subscribe())
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}