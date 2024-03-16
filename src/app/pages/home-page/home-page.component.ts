import { Component, OnInit } from '@angular/core';
import { RoadSectionsService } from 'src/app/services/road-sections/road-sections.service';
import { TopRoadTpiService } from 'src/app/services/top-road-tpi/top-road-tpi.service';
import { TopRoadTpiHistoryService } from 'src/app/services/top-road-tpi-history/top-road-tpi-history.service';
import { RoadTpiService } from 'src/app/services/road-tpi/road-tpi.service';
import { TotalMoeService } from 'src/app/services/total-moe/total-moe.service';
import { BarChart, LineChart, HeatmapChart, Card, FilterOption } from 'src/app/shared-component/interfaces';
import { ApiParams } from 'src/app/services/api-params';
import { UtillService } from 'src/app/services/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
})
export class HomePageComponent implements OnInit {

  topTenCongestedRoadsCard: Card = {
    title: 'Chart A',
    dataTime: '時間',
    filterString: '條件',
    componentName: 'topTenCongestedRoads'
  };
  topTenCongestedRoads: BarChart = {
    yType: 'category',
    xType: 'value',
    yAxis: [],
    xAxis: [],
  };

  topTenEasyCongestedRoadsCard: Card = {
    title: 'Chart B',
    dataTime: '',
    componentName: 'topTenEasyCongestedRoads'
  };
  topTenEasyCongestedRoads: BarChart = {
    yType: 'category',
    xType: 'value',
    yAxis: [],
    xAxis: [],
  };

  roadAvgTravelSpeedCard: Card = {
    title: 'Chart C',
    dataTime: '',
    componentName: 'roadAvgTravelSpeed'
  };
  roadAvgTravelSpeed: LineChart = {
    xAxis: [],
    lines: [
      { name: '路名', values: [] }
    ]
  }

  spatiotemporalAnalysisCard: Card = {
    title: 'Chart D',
    dataTime: '',
    componentName: 'spatiotemporalAnalysis'
  };
  spatiotemporalAnalysis: HeatmapChart = {
    yAxis: [],
    xAxis: [],
    showVisualMap: true,
    data: []
  };

  trafficTrendCard: Card = {
    title: 'Chart E',
    dataTime: '',
    componentName: 'trafficTrend'
  };
  trafficTrend: LineChart = {
    xAxis: [],
    lines: []
  }

  initYesterday: string = this.utillService.getYesterday();
  initStartTime: string = this.utillService.getLastMonthTime().start;
  initEndTime: string = this.utillService.getLastMonthTime().end;

  setTime(key: string, time: string) {
    this[`${key}Card`].dataTime = time;
  }

  setFilterString(key: string, filterString: string) {
    this[`${key}Card`].filterString = filterString;
  }

  async getTopTenCongestedRoadsData(e: FilterOption) {
    let filterString: string = '';
    let params: ApiParams = {
      $top: 10
    };
    await this.topRoadTpiService.fetchData(params);
    this.topTenCongestedRoadsData(filterString);
  }

  async getTopTenEasyCongestedRoadsData(e: FilterOption) {
    let params: ApiParams = {};
    await this.topRoadTpiHistoryService.fetchData(params);
    this.topTenEasyCongestedRoadsData(e.startTime, e.endTime);
  }

  async getRoadAvgTravelSpeedData(e: FilterOption) {
    let params: ApiParams = {};
    await this.roadTpiService.fetchRoadAvgTravelSpeedData(params);
    this.roadAvgTravelSpeedData(e.roadName, e.startTime, e.endTime);
  }

  async getSpatiotemporalAnalysisData(e: FilterOption) {
    const params: ApiParams = {
      $orderby: 'infoTime asc'
    };
    await this.roadTpiService.fetchSpatiotemporalAnalysisData(params);
    this.spatiotemporalAnalysisData(e.startTime);
  }

  async getTrafficTrendData(e: FilterOption) {
    let params: ApiParams = {
      $orderby: 'infoTime asc'
    };
    await this.totalMoeService.fetchData(params);
    this.trafficTrendData(e.startTime);
  }

  topTenCongestedRoadsData(filterString: string) {
    const key = 'topTenCongestedRoads';
    const data = this.topRoadTpiService.getData();
    const now = moment(new Date()).format('YYYY/MM/DD HH:MM:00');
    this.topTenCongestedRoads = data;
    this.setTime(key, `最後更新時間：${now}`);
    this.setFilterString(key, filterString);
  }

  topTenEasyCongestedRoadsData(
    startTime: string = this.initStartTime,
    endTime: string = this.initEndTime) {
    const key = 'topTenEasyCongestedRoads';
    const data = this.topRoadTpiHistoryService.getData();
    this.topTenEasyCongestedRoads = data;
    this.setTime(key, `時間範圍：${startTime} ~ ${endTime}`);
    this.utillService.setTime(key, startTime, endTime);
  }

  roadAvgTravelSpeedData(
    roadName: string,
    startTime: string = this.initStartTime,
    endTime: string = this.initEndTime) {
    const key = 'roadAvgTravelSpeed';
    const data = this.roadTpiService.getData(key);
    this.roadAvgTravelSpeed = data;
    this.setTime(key, `時間範圍：${startTime} ~ ${endTime}`);
    this.utillService.setTime(key, startTime, endTime);
  }

  spatiotemporalAnalysisData(date: string = this.initYesterday) {
    const key = 'spatiotemporalAnalysis';
    const data = this.roadTpiService.getData(key);
    this.spatiotemporalAnalysis = data;
    this.setTime(key, `時間：${date}`);
    this.utillService.setTime(key, date, date);
  }

  trafficTrendData(date: string = this.initYesterday) {
    const key = 'trafficTrend';
    const data = this.roadTpiService.getData(key);
    this.trafficTrend = data;
    this.setTime(key, `時間：${date}`);
    this.utillService.setTime(key, date, date);
  }

  async fetchTopTenCongestedRoadsData() {
    const params: ApiParams = {
      $top: 10,
      $orderby: 'tpi desc'
    };
    await this.topRoadTpiService.fetchData(params);
  }

  async fetchTopTenEasyCongestedRoadData(
    startTime: string = this.initStartTime,
    endTime: string = this.initEndTime) {
    const params: ApiParams = {};
    await this.topRoadTpiHistoryService.fetchData(params);
  }

  async fetchRoadAvgTravelSpeedData(
    roadName: string,
    startTime: string = this.initStartTime,
    endTime: string = this.initEndTime) {
    const params: ApiParams = {};
    await this.roadTpiService.fetchRoadAvgTravelSpeedData(params);
  }

  async fetchSpatiotemporalAnalysisData(date: string = this.initYesterday) {
    const params: ApiParams = {};
    await this.roadTpiService.fetchSpatiotemporalAnalysisData(params);
  }

  async fetchTrafficTrendData(date: string = this.initYesterday) {
    const params: ApiParams = {};
    await this.totalMoeService.fetchData(params);
  }

  async fetchData() {
    try {
      await this.roadSectionsService.fetchData();
      await this.fetchTopTenCongestedRoadsData();
      await this.fetchTopTenEasyCongestedRoadData();
      await this.fetchRoadAvgTravelSpeedData('XX路');
      await this.fetchSpatiotemporalAnalysisData();
      await this.fetchTrafficTrendData();
    } catch(err) {
      console.log(err);
    }
  }

  constructor(
    private topRoadTpiService: TopRoadTpiService,
    private topRoadTpiHistoryService: TopRoadTpiHistoryService,
    private roadTpiService: RoadTpiService,
    private roadSectionsService: RoadSectionsService,
    private totalMoeService: TotalMoeService,
    private utillService: UtillService) { }

  async ngOnInit() {
    await this.fetchData();
    try {
      this.topTenCongestedRoadsData('');
      this.topTenEasyCongestedRoadsData();
      this.roadAvgTravelSpeedData('XX路');
      this.spatiotemporalAnalysisData();
      this.trafficTrendData();
    } catch(err) {
      console.log(err);
    }
  }

}
