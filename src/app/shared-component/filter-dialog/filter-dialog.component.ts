import { DateObj } from './../time/day/day';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Checkboxes, Options, CheckedEvent } from '../interfaces';
import { FilterOption } from './filter-dialog';
import { pipe } from 'rxjs';

interface checkboxes {
  show: boolean;
  data: Checkboxes[];
}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.sass']
})
export class FilterDialogComponent implements OnInit {

  title: string;
  filter: any;

  faTimes = faTimes;
  faPaperPlane = faPaperPlane;

  // 控制 layout
  columnStyle: string = '';
  columnWidthStyle: string = 'w100';

  // 年月日專區
  datepicker = {
    show: false,
    yearFilter: false,
    yearMonthFilter: false,
    yearMonthDateFilter: false,
    singleDateFilter: false,
    hourFilter: false,
  };

  initDateRange: DateObj = {
    startDate: `2020-08-01`,
    endDate: `2020-09-30`,
  };

  peakHour: checkboxes = {
    show: false,
    data: [
      { name: '全日', value: '全日', checked: false },
      { name: '白天', value: '白天', checked: false },
      { name: '晚上', value: '晚上', checked: false }
    ]
  };

  // 平假日
  dayType: checkboxes = {
    show: false,
    data: [
      { name: '平日', value: 'holiday', checked: false },
      { name: '假日', value: 'weekday', checked: false }
    ]
  }

  // 行政區
  defaultDistrict: string = '大阪市';
  district = {
    show: false,
    title: '選擇行政區',
    data: [
      {
        name: '全大阪市',
        value: '全大阪市',
        group: 'district'
      },
      {
        name: '天王寺區',
        value: '天王寺區',
        group: 'district'
      },
      {
        name: '大正區',
        value: '大正區',
        group: 'district'
      },
    ]
  }

  // 特殊額外選項
  selectedOption: string;
  options = {
    show: false,
    title: '',
    data: []
  }

  // 特殊額外選項，多選
  selectedCheckboxes: string[];
  checkboxes = {
    show: false,
    allChecked: true,
    title: '',
    data: []
  }

  // 使用者的篩選選項
  filterOption: FilterOption = {};

  getColumnClassName(filter: any) {
    if (filter.district || filter.parkingLot || filter.roadSection) {
      this.columnStyle = 'multiple-column';
      this.columnWidthStyle = 'w50';
    }
  }

  datepickerFilter(filter: any) {
    if (filter.dataTime) {
      this.initDateRange.startDate = filter.dataTime.startTime;
      this.initDateRange.endDate = filter.dataTime.endTime;
    }

    if (filter.datepicker.year) {
      this.datepicker.show = true;
      if (filter.datepicker.month) {
        if (filter.datepicker.date) {
          if (filter.datepicker.singleDate) {
            // 單選年/月/日
            this.datepicker.singleDateFilter = true;
            this.filterOption.startTime = this.initDateRange.startDate;  // 指定預設值
            this.filterOption.endTime = this.initDateRange.startDate;    // 指定預設值
          } else {
            // 範圍年/月/日
            this.datepicker.yearMonthDateFilter = true;
            this.filterOption.startTime = this.initDateRange.startDate;  // 指定預設值
            this.filterOption.endTime = this.initDateRange.endDate;    // 指定預設值
          }
        } else {
          // 年/月
          this.datepicker.yearMonthFilter = true;
          this.filterOption.startTime = this.initDateRange.startDate;  // 指定預設值
          this.filterOption.endTime = this.initDateRange.endDate;      // 指定預設值
        }
      } else {
        // 年
        this.datepicker.yearFilter = true;
        this.filterOption.startTime = this.initDateRange.startDate;  // 指定預設值
        this.filterOption.endTime = this.initDateRange.endDate;    // 指定預設值
      }
    }
    if (filter.datepicker.hour) {
      this.datepicker.hourFilter = true;
      this.filterOption.hour = 12;  // 指定預設值
    }
  }

  dayTypeFilter(filter: any) {
    if (filter.datepicker.weekday) {
      this.dayType.show = true;
      this.filterOption.dayType = [this.dayType.data[0].name];  // 指定預設值
      this.dayType.data[0].checked = true;
    }
  }

  peakHourFilter(filter: any) {
    if (filter.datepicker.peakhour) {
      this.peakHour.show = true;
      this.filterOption.peakHour = [this.peakHour.data[0].name];  // 指定預設值
      this.peakHour.data[0].checked = true;
    }
  }

  optionsFilter(filter: any) {
    if (filter.options) {
      if (filter.options.data.length < 1) return;
      this.options.show = true;
      this.options.title = filter.options.title;
      this.options.data = filter.options.data;
      const key = this.options.data[0].group;
      const value = filter.options.selected;
      this.selectedOption = value;
      this.filterOption[key] = value;  // 指定預設值
    }
  }

  checkboxesFilter(filter: any) {
    if (filter.checkboxes) {
      if (filter.checkboxes.data.length < 1) return;
      this.checkboxes.show = true;
      this.checkboxes.title = filter.checkboxes.title;
      this.checkboxes.data = filter.checkboxes.data;
    }
  }

  districtFilter(filter: any) {
    if (filter.district) {
      this.district.show = true;
      const value = filter.districtSelected;
      this.filterOption.district = value;  // 指定預設值
      this.defaultDistrict = value;
      if (this.filter.districtReName) {
        this.district.title = this.filter.districtReName;
      }
    }
  }

  // =============== HANDLER ===============

  getCheckboxesValue(array: Checkboxes[]) {
    const filtered = (array: Checkboxes[]) => array.filter(item => item.checked === true);
    const mapping = (array: Checkboxes[]) => array.map(item => item.value);
    return pipe(
      filtered,
      mapping
    )(array);
  }

  peakHourHandler(p: CheckedEvent) {
    const peakHour = this.getCheckboxesValue(p.checked);
    this.filterOption.peakHour = peakHour;
  }

  dayTypeHandler(d: CheckedEvent) {
    const dayType = this.getCheckboxesValue(d.checked);
    this.filterOption.dayType = dayType;
  }

  optionsHandler(o: Options) {
    const key = o.group;
    this.filterOption[key] = o.value;
    if (key === 'district') {
      this.filter.districtSelected = o.value;
    } else {
      this.filter.options.selected = o.value;
    }
  }

  checkboxesHandler(checkbox: any) {
    setTimeout(() => {
      this.checkboxes.allChecked = checkbox.allChecked;
      const key = this.checkboxes.data[0].group;
      const checkedItems = checkbox.checked.map((c: Checkboxes) => c.value);
      this.filterOption[key] = {
        allChecked: checkbox.allChecked,
        checked: checkedItems
      };
    }, 100);
  }

  timeHandler(d: any) {
    this.filterOption.startTime = d.startDate;
    this.filterOption.endTime = d.endDate;
  }

  hourHandler(h: number) {
    this.filterOption.hour = h;
  }

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.filter = data.data.filter;
  }

  ngOnInit() {
    this.getColumnClassName(this.filter);
    this.datepickerFilter(this.filter);
    this.dayTypeFilter(this.filter);
    this.peakHourFilter(this.filter);
    this.districtFilter(this.filter);
    this.optionsFilter(this.filter);
    this.checkboxesFilter(this.filter);
  }

}
