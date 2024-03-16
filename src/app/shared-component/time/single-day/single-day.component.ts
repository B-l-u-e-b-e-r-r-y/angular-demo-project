import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { DateObj } from './single-day';

@Component({
  selector: 'app-single-day',
  templateUrl: './single-day.component.html',
  styleUrls: ['./single-day.component.sass']
})
export class SingleDayComponent implements OnInit {

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

  afterClose() {
    const ctrlValue = this.date.value;
    this.date.setValue(ctrlValue);
    const dateString = this.dateFormatter(this.date.value);
    this.selectedDateEvent.emit(dateString);
  }

  dateFormatter(date): DateObj {
    // 要給資料庫的字串日期
    const startDate = moment(date).format('YYYY-MM-DD');
    const endDate = moment(date).format('YYYY-MM-DD');
    return { startDate, endDate };
  }
}
