import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { colors } from '../colors';
import { BarChart } from '../interfaces';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit, OnChanges {

  @Input() data: BarChart = {
    xType: 'category',
    yType: 'value',
    xAxis: [],
    yAxis: [],
    xName: '',
    yName: '',
    colorLevel: [0, 4, 6, 8, 10],
  };

  constructor() { }

  barChartUpdates: any = {};
  colorLevelArr = [colors['color-primary-400'], colors['color-warning-400'], colors['color-danger-400'], colors['color-success-400']];
  colorArr = [colors['color-primary-400'], colors['color-warning-400'], colors['color-danger-400'], colors['color-success-400']];
  color = colors['color-primary-400'];

  barChartOption: any = {
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
      top: '5%',
      left: '25%',
    },
    xAxis: [{
      type: this.data.xType,
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
        interval: 0,
        margin: 20,
        color: colors['color-gray-400'],
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: true,
      },
      data: [],

    }],
    yAxis: [{
      type: this.data.yType,
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
        interval: 0,
        margin: 20,
        textStyle: {
          color: colors['color-gray-400'],
        }
      },
      axisTick: {
        show: true,
      },
    }],
    series: [{
      type: 'bar',
      barWidth: 10,
      itemStyle: {
        normal: {
          barBorderRadius: 10,
          color: colors['color-primary-400'],
        },
        label: {
          show: true,
          position: 'right',
          color: colors['color-gray-500'],
        },
      },
      data: [],
    }],
  };

  determineColor(values, category) {
    const self = this;
    
    if (self.data.color) {
      return values.map(e => this.color);
    }

    if (self.data.colorLevel && self.data.colorLevel.length > 0) {
      const colorLevel = self.data.colorLevel;
      const result = values.map(e => {
        const colorIdx = (() => {
          for (let i = 0; i < colorLevel.length - 1; i++) {
            if (e >= colorLevel[i] && e <= colorLevel[i + 1]) {
              return i;
            }
          }
        })();
        return this.colorLevelArr[colorIdx];
      });
      return result;
    } else {
      if (self.data.colorCategory) {
        return category.map((e, i) => self.colorArr[i % self.colorArr.length]);
      }
      return values.map(e => colors['color-primary-400']);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      this.data = changes.data.currentValue;

      // 判斷是用x軸還是y軸當數值
      const value = this.data.xType === 'value' ? this.data.xAxis : this.data.yAxis;
      const category = this.data.xType === 'category' ? this.data.xAxis : this.data.yAxis;

      this.barChartUpdates.xAxis = [{
        name: this.data.xName,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors['color-gray-400'],
          }
        },
        axisLabel: {
          interval: 0,
          margin: 20,
          textStyle: {
            color: colors['color-gray-400'],
          },
        },
        splitLine: {
          show: false
        },
        type: this.data.xType,
        data: this.data.xAxis,
      }];

      this.barChartUpdates.yAxis = [{
        name: this.data.yName,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors['color-gray-400'],
          }
        },
        axisLabel: {
          interval: 0,
          margin: 20,
          textStyle: {
            color: colors['color-gray-400'],
          },
          formatter: (name) => {
            if (name.length > 9) {
              return name.substr(0, 9) + '...';
            }
            return name;
          },
        },
        splitLine: {
          show: false
        },
        type: this.data.yType,
        data: this.data.yAxis,
      }];

      if (this.data.color) {
        this.color = this.data.color;
      }

      const barColors = this.determineColor(value, category);
      this.barChartUpdates.series = [{
        itemStyle: {
          normal: {
            color: (params) => barColors[params.dataIndex]
          },
        },
        data: value,
      }];
      this.barChartUpdates = { ...this.barChartUpdates };
    }
  }
}
