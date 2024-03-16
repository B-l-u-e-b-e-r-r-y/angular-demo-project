import { Injectable } from '@angular/core';
import { Component } from './component';
import { Checkboxes, Options } from '../../shared-component/interfaces';
@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor() { }

  topTenCongestedRoads: Component = {
    type: 'bar',
    data: {},
    detail: {},
    isDetail: true,
    isFilter: true,
    detailDialogWidth: 80,
    chartDialogWidth: 80,
    fileName: 'Chart A',
    detailEngToZhTw: {
      roadName: '路段名稱',
      areaName: '行政區',
      tpi: '指標'
    },
    filter: {
      datepicker: {
        year: false,
        month: false,
        date: false,
        hour: false,
        weekday: false,
        peakhour: false
      },
      district: true,
      districtSelected: '天王寺區'
    }
  }

  topTenEasyCongestedRoads: Component = {
    type: 'bar',
    data: {},
    detail: {},
    isDetail: true,
    isFilter: true,
    detailDialogWidth: 80,
    chartDialogWidth: 80,
    fileName: 'Chart B',
    detailEngToZhTw: {
      roadName: '路名',
      areaName: '行政區',
      count: '次數'
    },
    filter: {
      datepicker: {
        year: true,
        month: true,
        date: true,
        hour: false,
        weekday: false,
        peakhour: false
      },
      district: true,
      districtSelected: '全大阪市'
    }
  }

  roadAvgTravelSpeed: Component = {
    type: 'line',
    data: {},
    detail: {},
    isDetail: true,
    isFilter: true,
    detailDialogWidth: 80,
    chartDialogWidth: 80,
    fileName: 'Chart C',
    detailEngToZhTw: {
      roadName: '路名',
      tpi: '指標',
      infoTime: '更新時間'
    },
    removeCols: ['srcUpdateTime', 'infoDate'],
    filter: {
      datepicker: {
        year: true,
        month: true,
        date: true,
        hour: false,
        weekday: false,
        peakhour: false
      },
      district: false,
      options: {
        title: '路段',
        data: []
      }
    }
  }

  spatiotemporalAnalysis: Component = {
    type: 'heatmap',
    data: {},
    detail: {},
    isDetail: true,
    isFilter: true,
    detailDialogWidth: 80,
    chartDialogWidth: 80,
    fileName: 'Chart D',
    detailEngToZhTw: {
      roadName: '路名',
      tpi: '指標',
      infoTime: '更新時間'
    },
    removeCols: ['srcUpdateTime', 'infoDate'],
    filter: {
      datepicker: {
        year: true,
        month: true,
        date: true,
        singleDate: true,
        hour: false,
        weekday: false,
        peakhour: false
      },
      district: false,
      checkboxes: {
        title: '路段',
        allChecked: true,
        data: []
      }
    }
  }

  trafficTrend: Component = {
    type: 'trend-line',
    data: {},
    detail: {},
    isDetail: true,
    isFilter: true,
    detailDialogWidth: 80,
    chartDialogWidth: 80,
    fileName: 'Chart E',
    detailEngToZhTw: {
      infoTime: '更新時間'
    },
    filter: {
      datepicker: {
        year: true,
        month: true,
        date: true,
        singleDate: true,
        hour: false,
        weekday: false,
        peakhour: false
      },
      district: false,
    }
  }

  cards: any = {
    topTenCongestedRoads: this.topTenCongestedRoads,
    topTenEasyCongestedRoads: this.topTenEasyCongestedRoads,
    roadAvgTravelSpeed: this.roadAvgTravelSpeed,
    spatiotemporalAnalysis: this.spatiotemporalAnalysis,
    trafficTrend: this.trafficTrend
  };

  get(key: string) {
    return this.cards[key];
  }

  setData(key: string, data: any) {
    this.cards[key].data = data;
  }

  setDetail(key: string, data: any) {
    this.cards[key].detail = data;
  }

  setOptions(key: string, data: Options[]) {
    this.cards[key].filter.options.data = data;
  }

  setSelectedOption(key: string, option: string) {
    this.cards[key].filter.options.selected = option;
  }

  setCheckboxes(key: string, data: Checkboxes[]) {
    this.cards[key].filter.checkboxes.data = data;
  }

  setTime(key: string, startTime: string, endTime: string) {
    this.cards[key].filter.dataTime = { startTime, endTime };
  }

  ngOnInit() {

  }
}
