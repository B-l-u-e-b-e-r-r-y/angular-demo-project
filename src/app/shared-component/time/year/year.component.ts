import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DateObj } from '../month/month';

export const YEAR_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: YEAR_FORMATS },
  ],
})
export class YearComponent implements OnInit {

  constructor() { }

  @Output() selectedDateEvent = new EventEmitter<DateObj>();
  @Input() initDate?: string;

  date = new FormControl(moment());

  ngOnInit(): void {
    // 預設值
    if (this.initDate) {
      this.date = new FormControl(moment(this.initDate));
    }
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    const dateString = this.dateFormatter(this.date.value);
    this.selectedDateEvent.emit(dateString);
  }

  dateFormatter(date): DateObj {
    // 要給資料庫的字串日期
    const startDate = moment(date).startOf('year').format('YYYY-MM-DD');
    const endDate = moment(date).endOf('year').format('YYYY-MM-DD');
    return { startDate, endDate };
  }

}
