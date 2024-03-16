import { Injectable } from '@angular/core';
import { ApiParams } from '../api-params';
import { BackendApiService } from '../backend.service';
import { ComponentService } from '../component/component.service';
import { TopRoadTpiApi } from './top-road-tpi';
import { BarChart } from '../../shared-component/interfaces';

@Injectable({
  providedIn: 'root'
})
export class TopRoadTpiService {

  key: string = 'topTenCongestedRoads';
  rawData: TopRoadTpiApi[] = [];
  data: BarChart;
  detailData: any;

  processData() {
    const yAxis = [];
    const xAxis = [];
    this.rawData.forEach(r => {
      yAxis.push(r.roadName);
      xAxis.push(r.tpi);
    });
    this.data = {
      yType: 'category',
      xType: 'value',
      yAxis: yAxis.reverse(),
      xAxis: xAxis.reverse(),
      xName: '指標',
      colorLevel: [0, 4, 6, 8, 10],
    };
  }

  async fetchData(params: ApiParams = {}) {
    const route = '/Dashboard/api/TopRoadTpi';
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
