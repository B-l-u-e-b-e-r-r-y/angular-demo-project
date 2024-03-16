import { Injectable } from '@angular/core';
import { ApiParams } from '../api-params';
import { BackendApiService } from '../backend.service';
import { ComponentService } from '../component/component.service';
import { Checkboxes, Options } from '../../shared-component/interfaces';
import { RoadSectionsApi } from './road-sections';

@Injectable({
  providedIn: 'root'
})
export class RoadSectionsService {
  
  keys: any = {
    checkbox: ['spatiotemporalAnalysis'],
    option: ['roadAvgTravelSpeed']
  }
  rawData: RoadSectionsApi[] = [];
  checkbox: Checkboxes[] = [];
  option: Options[] = [];

  processData() {
    const roadsTable = {};

    this.rawData.forEach(r => {
      if (!roadsTable[r.RoadName]) roadsTable[r.RoadName] = 0;
    });

    const roads = Object.keys(roadsTable);
    roads.forEach(road => {
      this.checkbox.push({
        name: road,
        value: road,
        checked: false,
        group: 'roads'
      });
      this.option.push({
        name: road,
        value: road,
        group: 'roadName'
      });
    });

    this.componentService.setSelectedOption('roadAvgTravelSpeed', roads[0]);
  }

  async fetchData() {
    const params: ApiParams = {
      $select: 'RoadName'
    };
    
    const route = '/Traffic/api/Section';
    this.rawData = await this.backendApiService.get(route, params);
    this.processData();
    this.setData();
  }

  setData() {
    this.keys.checkbox.forEach(key => {
      this.componentService.setCheckboxes(key, this.checkbox);
    });
    this.keys.option.forEach(key => {
      this.componentService.setOptions(key, this.option);
    });
  }

  constructor(
    private backendApiService: BackendApiService,
    private componentService: ComponentService) { }
}
