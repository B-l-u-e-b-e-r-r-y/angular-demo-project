import { colors } from '../colors';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-trend-line-chart',
  templateUrl: './trend-line-chart.component.html',
  styleUrls: ['./trend-line-chart.component.sass']
})

export class TrendLineChartComponent implements OnInit, OnChanges {
  @Input() data: any = {
    xAxis: [],
    lines: [],
  };

  constructor() { }

  lineChartOption: any = {};

  drawChart(data: any) {
    let max = 0;

    if (data.lines.length > 2) {
      const line1 = data.lines[0].values[0] ? data.lines[0].values[0] : 0;
      const line2 = data.lines[1].values[0] ? data.lines[1].values[1] : 0;
      const line3 = data.lines[2].values[0] ? data.lines[2].values[0] : 0;
      max = line1 + line2 + line3;
    }

    const colorNames = ['danger-500', 'warning-500', 'primary-500'];
    const series = [];

    data.lines.forEach((line, index) => {
      series.push({
        name: line.name,
        type: 'line',
        showAllSymbol: true,
        symbol: 'circle',
        showSymbol: false,
        symbolSize: 5,
        lineStyle: {
          normal: {
            width: 1
          },
        },
        itemStyle: {
          color: colors[`color-${colorNames[index]}`],
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0, 0, 0, .1)',
          shadowBlur: 0,
          shadowOffsetY: 2,
          shadowOffsetX: 2,
        },
        tooltip: {
          show: true
        },
        data: line.values,
        stack: 'stack',
        areaStyle: {}
      });
    });

    this.lineChartOption = {
      legend: {
        show: true,
        data: data.lines.map(l => l.name),
        textStyle:{
          color: colors['color-gray-400'],
          fontSize: 14
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: 'rgba(0, 255, 233,0)'
              }, {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
              }, {
                offset: 1,
                color: 'rgba(0, 255, 233,0)'
              }],
              global: false
            }
          },
        },
      },
      grid: {
        top: '15%',
        right: '3%',
      },
      xAxis: [{
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: colors['color-gray-400'],
          }
        },
        splitArea: {
          show: false
        },
        axisLabel: {
          margin: 20,
          color: colors['color-gray-400'],
        },
        splitLine: {
          show: false
        },
        boundaryGap: false,
        axisTick: {
          show: true,
        },
        data: data.xAxis
      }],
      yAxis: [{
        name: '',
        type: 'value',
        min: 0,
        max: max,
        splitNumber: 4,
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors['color-gray-400'],
          }
        },
        axisLabel: {
          margin: 20,
          textStyle: {
            color: colors['color-gray-400'],
          },
        },
        axisTick: {
          show: true,
        },
      }],
      series: series
    };
  }

  ngOnInit() {
  }
  
  ngOnChanges(changes: any): void {
    // 單一線段的圖
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.drawChart(this.data);
    }
  }

}
