import { Component, signal, LOCALE_ID } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import {
  DateFnsAdapter,
  MatDateFnsModule
} from '@angular/material-date-fns-adapter';

import { ru } from 'date-fns/locale';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd.MM.yyyy',
  },
  display: {
    dateInput: 'dd.MM.yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd.MM.yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
   providers: [
  ],
  styleUrl: './app.scss'
})
export class App {

  protected readonly title = signal('markeplace');

  constructor(public router: Router) { }
}
