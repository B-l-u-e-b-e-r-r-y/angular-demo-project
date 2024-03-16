import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DateObj } from './day';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.sass']
})
export class DayComponent implements OnInit {

  constructor() { }

  @Output() selectedDateEvent = new EventEmitter<DateObj>();
  @Input() initDate?: DateObj;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  ngOnInit(): void {
    // 預設值
    if (this.initDate) {
      this.range = new FormGroup({
        start: new FormControl(moment(this.initDate.startDate)),
        end: new FormControl(moment(this.initDate.endDate))
      });
    }
  }
  afterClose() {
    const dateString = this.dateFormatter(this.range.value);
    this.selectedDateEvent.emit(dateString);
  }

  dateFormatter(range): DateObj {
    // 要給資料庫的字串日期
    const startDate = moment(range.start).format('YYYY-MM-DD');
    const endDate = moment(range.end).format('YYYY-MM-DD');
    return { startDate, endDate };
  }
}
