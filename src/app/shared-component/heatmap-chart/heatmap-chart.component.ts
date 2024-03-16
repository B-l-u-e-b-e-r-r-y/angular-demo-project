import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { colors } from '../colors';
import { HeatmapChart } from './heatmap-chart';
@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.sass']
})
export class HeatmapChartComponent implements OnInit, OnChanges {
  @Input() data: HeatmapChart = {
    xAxis: [],
    yAxis: [],
    showVisualMap: true,
    data: [],
  };
  heatmapChartOption = {}

  drawChart(chartdata: any) {
    this.heatmapChartOption = {
      tooltip: {
        position: 'top',
      },
      grid: {
        left: '5%',
        right: '0%',
        bottom: '0%',
        top: chartdata.showVisualMap ? '10%' : '0%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: chartdata.xAxis,
        position: 'top',
        axisLine: {
          lineStyle: {
            color: colors['color-gray-400']
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
          },
        },
        splitArea: {
          show: true
        },
      },
      yAxis: {
        type: 'category',
        data: chartdata.yAxis,
        axisLine: {
          lineStyle: {
            color: colors['color-gray-400']
          }
        },
        axisLabel: {
          textStyle: {
            fontSize: 14,
          },
        },
        splitArea: {
          show: true
        },
      },
      visualMap: {
        show: chartdata.showVisualMap,
        orient: 'horizontal',
        left: 'center',
        top: 0,
        max: 10,
        pieces: [{
          max: 0,
          min: 2,
          color: colors['color-primary-300'],
          label: 'Level 0'
        }, {
          max: 4,
          min: 2,
          color: colors['color-primary-500'],
          label: 'Level 1',
        }, {
          max: 6,
          min: 4,
          color: colors['color-warning-500'],
          label: 'Level 2'
        }, {
          max: 8,
          min: 6,
          color: colors['color-danger-500'],
          label: 'Level 3'
        }, {
          max: 10,
          min: 8,
          color: colors['color-success-500'],
          label: 'Level 4'
        }],
        textStyle: {
          color: colors['color-gray-400'],
        }
      },
      series: [{
        name: 'TPI',
        type: 'heatmap',
        data: chartdata.data,
        label: {
          normal: {
            show: true,
            fontSize: 14,
          }
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 20,
            shadowColor: 'rgba(0, 0, 0, 0.1)'
          }
        }
      }]
    };
  }

  constructor() { }

  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.drawChart(this.data);
    }
  }

  ngOnInit(): void {
  }

}
