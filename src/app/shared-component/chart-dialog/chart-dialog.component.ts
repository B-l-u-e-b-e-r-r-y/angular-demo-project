import { Component, OnInit, Inject, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'chart-dialog',
  templateUrl: './chart-dialog.component.html',
  styleUrls: ['./chart-dialog.component.sass']
})
export class ChartDialogComponent implements AfterViewInit, OnInit {

  @ViewChild('barChart', { static: true }) barChart: TemplateRef<any>;
  @ViewChild('lineChart', { static: true }) lineChart: TemplateRef<any>;
  @ViewChild('heatmap', { static: true }) heatmap: TemplateRef<any>;
  @ViewChild('trendLineChart', { static: true }) trendLineChart: TemplateRef<any>;
  
  displayComponent: TemplateRef<any>;

  title: string;
  dataTime: string;
  filterString?: string;
  fullFilterString?: string;
  type: string;
  data: any;

  faTimes = faTimes;

  constructor(@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.dataTime = data.dataTime;
    this.data = data.data.data;
    this.type = data.data.type;
    if (data.filterString) this.filterString = data.filterString;
    if (data.fullFilterString) this.fullFilterString = data.fullFilterString;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      switch (this.type) {
        case 'bar':
          this.displayComponent = this.barChart;
          break;
        case 'line':
          this.displayComponent = this.lineChart;
          break;
        case 'trend-line':
          this.displayComponent = this.trendLineChart;
          break;
        case 'heatmap':
          this.displayComponent = this.heatmap;
          break;
      }
    }, 0);
  }

  ngOnInit() { }

}
