import { Injectable } from '@angular/core';
import { ComponentService } from './component/component.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtillService {

  constructor(private componentService: ComponentService) {}
  
  getYesterday() {
    return moment().subtract(1, 'days').format('YYYY-MM-DD');
  }

  getLastMonthTime() {
    const lastMonthStart = moment().subtract(1, 'month').format('YYYY-MM-01');
    const thisMonth = moment().format('YYYY-MM-01');
    const lastMonthEnd = moment(thisMonth).subtract(1, 'days').format('YYYY-MM-DD');
    return { start: lastMonthStart, end: lastMonthEnd };
  }

  setTime(key: string, startTime: string, endTime: string) {
    this.componentService.setTime(key, startTime, endTime);
  }

}