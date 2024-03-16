import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
// Components
import { CardComponent } from './card/card.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HeatmapChartComponent } from './heatmap-chart/heatmap-chart.component';
import { TrendLineChartComponent } from './trend-line-chart/trend-line-chart.component';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { OptionsComponent } from './options/options.component';
import { DetailDialogComponent } from './detail-dialog/detail-dialog.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { CheckboxesComponent } from './checkboxes/checkboxes.component';
import { YearComponent } from './time/year/year.component';
import { MonthComponent } from './time/month/month.component';
import { DayComponent } from './time/day/day.component';
import { HourComponent } from './time/hour/hour.component';
import { SingleDayComponent } from './time/single-day/single-day.component';
import { TableComponent } from './table/table.component';

const COMPONENTS = [
  CardComponent,
  LineChartComponent,
  BarChartComponent,
  HeatmapChartComponent,
  TrendLineChartComponent,
  OptionsComponent,
  DetailDialogComponent,
  ChartDialogComponent,
  FilterDialogComponent,
  CheckboxesComponent,
  YearComponent,
  MonthComponent,
  DayComponent,
  HourComponent,
  SingleDayComponent,
  TableComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    NgxEchartsModule.forRoot({ echarts }),
    LeafletModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class SharedComponentModule { }
