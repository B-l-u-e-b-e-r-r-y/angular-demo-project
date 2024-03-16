import { Injectable } from '@angular/core';
import { ApiParams } from '../api-params';
import { BackendApiService } from '../backend.service';
import { ComponentService } from '../component/component.service';
import { RoadTpiApi } from './road-tpi';
import { LineChart, HeatmapChart } from '../../shared-component/interfaces';
import * as moment from 'moment';
import { pipe } from 'rxjs';

interface RawData {
  roadAvgTravelSpeed?: RoadTpiApi[];
  spatiotemporalAnalysis?: RoadTpiApi[];
}

interface Data {
  roadAvgTravelSpeed?: LineChart;
  spatiotemporalAnalysis?: HeatmapChart;
}

@Injectable({
  providedIn: 'root'
})
export class RoadTpiService {

  rawData: RawData = {};
  data: Data = {};

  processRoadAvgTravelSpeedData() {

    // 取小時
    const getDateObj = (array: RoadTpiApi[]) => {
      const obj = {};
      array.forEach(item => {
        const date = item.infoDate;
        if (!obj[date]) obj[date] = [];
        obj[date].push(item);
      });
      return obj;
    }

    // 平均
    const avgTravelSpeed = (dateObj: any) => {
      let obj = {};
      for (let date in dateObj) {
        let travelSpeedTotal = 0;
        for (let d = 0; d < dateObj[date].length; d++) {
          const item = dateObj[date][d];
          const travelSpeed = item.travelSpeed;
          travelSpeedTotal += travelSpeed;
        }
        const avg = (travelSpeedTotal / dateObj[date].length);
        obj[date] = parseFloat(avg.toFixed(2));
      }
      return obj;
    }

    const obj = pipe(
      getDateObj,
      avgTravelSpeed
    )(this.rawData.roadAvgTravelSpeed);

    const xAxis = Object.keys(obj);
    const lines: number[] = Object.values(obj);

    this.data.roadAvgTravelSpeed = {
      xAxis: xAxis,
      lines: [
        { name: '', values: lines }
      ],
      yName: ''
    };
  }

  processSpatiotemporalAnalysisData() {
    const obj = {};
    const data = [];

    this.rawData.spatiotemporalAnalysis.map(r => {
      // 順便處理 tpi 為整數
      r.tpi = parseInt(r.tpi.toString());
      const hour = moment(r.infoTime).hour();
      if (!obj[r.roadName]) obj[r.roadName] = {};
      if (!obj[r.roadName][hour]) obj[r.roadName][hour] = parseInt(r.tpi.toString());
      return r;
    });

    let hours = [];
    for (let roadName in obj) {
      hours = Object.keys(obj[roadName]);
      const x = Object.keys(obj).indexOf(roadName);
      for (let hour in obj[roadName]) {
        const y = Object.keys(obj[roadName]).indexOf(hour);
        const value = obj[roadName][hour];
        data.push([y, x, value]);
      }
    }
    
    this.data.spatiotemporalAnalysis = {
      yAxis: Object.keys(obj),
      xAxis: hours,
      showVisualMap: true,
      data: data
    };
  }

  async fetchRoadAvgTravelSpeedData(params: ApiParams = {}) {
    const route = '/Dashboard/api/RoadTpi';
    this.rawData.roadAvgTravelSpeed = await this.backendApiService.get(route, params);
    this.processRoadAvgTravelSpeedData();
    this.setData('roadAvgTravelSpeed');
  }

  async fetchSpatiotemporalAnalysisData(params: ApiParams = {}) {
    const route = '/Dashboard/api/RoadTpi';
    this.rawData.spatiotemporalAnalysis = await this.backendApiService.get(route, params);
    this.processSpatiotemporalAnalysisData();
    this.setData('spatiotemporalAnalysis');
  }

  setData(key: string) {
    this.componentService.setData(key, this.data[key]);
    this.componentService.setDetail(key, this.rawData[key]);
  }

  getData(key: string) {
    const data = this.componentService.get(key).data;
    return data;
  }

  constructor(
    private backendApiService: BackendApiService,
    private componentService: ComponentService) { }
}
