import { Injectable } from '@angular/core';
import { ApiParams } from '../api-params';
import { BackendApiService } from '../backend.service';
import { ComponentService } from '../component/component.service';
import { TopRoadTpiHistoryApi } from './top-road-tpi-history';
import { BarChart } from '../../shared-component/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TopRoadTpiHistoryService {

  key: string = 'topTenEasyCongestedRoads';
  rawData: TopRoadTpiHistoryApi[] = [];
  data: BarChart;
  detailData: any;

  processData() {
    // 取前十
    this.rawData = this.rawData.splice(0, 10);

    const yAxis = [];
    const xAxis = [];
    this.rawData.forEach(r => {
      yAxis.push(r.roadName);
      xAxis.push(r.count);
    });
    this.data = {
      yType: 'category',
      xType: 'value',
      yAxis: yAxis.reverse(),
      xAxis: xAxis.reverse(),
      xName: '累積',
    };
  }

  async fetchData(params: ApiParams = {}) {
    const route = '/Dashboard/api/TopRoadTpiHistory';
    this.rawData = await this.backendApiService.get(route, params);
    this.processData();
    this.setData();
  }

  setData() {
    this.componentService.setData(this.key, this.data);
    this.componentService.setDetail(this.key, this.rawData);
  }

  getData() {
    const data = this.componentService.get(this.key).data;
    return data;
  }

  constructor(
    private backendApiService: BackendApiService,
    private componentService: ComponentService) { }
}
