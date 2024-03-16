import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DateObj } from './month';

export const YEAR_MONTH_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  }
};

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.sass'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: YEAR_MONTH_FORMATS },
  ],
})

export class MonthComponent implements OnInit {

  constructor() { }

  @Output() selectedDateEvent = new EventEmitter<DateObj>();
  @Input() initDate?: DateObj;

  startDate = new FormControl(moment());
  endDate = new FormControl(moment());

  ngOnInit(): void {
    // 預設值
    if (this.initDate) {
      this.startDate = new FormControl(moment(this.initDate.startDate));
      this.endDate = new FormControl(moment(this.initDate.endDate));
    }
  }

  chosenStartYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.startDate.value;
    ctrlValue.year(normalizedYear.year());
    this.startDate.setValue(ctrlValue);
  }

  chosenStartMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.startDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.startDate.setValue(ctrlValue);
    datepicker.close();
    this.emitDateString();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.endDate.value;
    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.endDate.setValue(ctrlValue);
    datepicker.close();
    this.emitDateString();
  }

  emitDateString() {
    const startDateString = this.dateFormatter(this.startDate.value).startDate;
    const endDateString = this.dateFormatter(this.endDate.value).endDate;
    this.selectedDateEvent.emit({ startDate: startDateString, endDate: endDateString});
  }
  
  dateFormatter(date): DateObj {
    // 要給資料庫的字串日期
    const startDate = moment(date).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(date).endOf('month').format('YYYY-MM-DD');
    return { startDate, endDate };
  }
}
