import { Injectable } from '@angular/core';
import { ApiParams } from '../api-params';
import { BackendApiService } from '../backend.service';
import { ComponentService } from '../component/component.service';
import { TotalMoeApi } from './total-moe';
import { LineChart } from '../../shared-component/interfaces';
import * as moment from 'moment';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TotalMoeService {

  key: string = 'trafficTrend';
  rawData: TotalMoeApi[] = [];
  data: LineChart;
  detailData: TotalMoeApi[];

  processData() {
    const obj = {};

    this.rawData.forEach(r => {
      const hour = moment(r.infoTime).hour();
      if (!obj[hour]) obj[hour] = { 0: 0, 1: 0, 2: 0 };
      obj[hour][r.moe] = r.times;
    });

    const xAxis = Object.keys(obj);
    const green = [];
    const yellow = [];
    const red = [];

    for (let hour in obj) {
      for (let moe in obj[hour]) {
        const value = obj[hour][moe];
        if (moe === '0') green.push(value);
        else if (moe === '1') yellow.push(value);
        else if (moe === '2') red.push(value);
      }
    }

    this.data = {
      xAxis: xAxis,
      lines: [
        { name: 'Red', values: red },
        { name: 'Yellow', values: yellow },
        { name: 'Green', values: green }
      ]
    };
  }

  processDetailData() {
    // 排序 infoTime
    const sortInfoTime = (array: TotalMoeApi[]) => array.sort((a, b) => a.infoTime > b.infoTime ? 1 : -1);
    
    // 排序 moe
    const sortMoe = (array: TotalMoeApi[]) => array.sort((a, b) => a.moe > b.moe ? 1 : -1);

    this.detailData = pipe(
      sortInfoTime,
      sortMoe
    )(this.rawData);
  }

  async fetchData(params: ApiParams = {}) {
    const route = '/Dashboard/api/TotalMoe';
    this.rawData = await this.backendApiService.get(route, params);
    this.processData();
    this.processDetailData();
    this.setData();
  }

  setData() {
    this.componentService.setData(this.key, this.data);
    this.componentService.setDetail(this.key, this.detailData);
  }

  getData() {
    const data = this.componentService.get(this.key).data;
    return data;
  }

  constructor(
    private backendApiService: BackendApiService,
    private componentService: ComponentService) { }
}
