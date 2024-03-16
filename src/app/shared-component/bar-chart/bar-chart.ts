export interface BarChart {
  xType: 'value' | 'category';
  yType: 'value' | 'category';
  xAxis: Array<string | number>;
  yAxis: Array<string | number>;
  xName?: string;
  yName?: string;
  colorLevel?: Array<number>;
  colorCategory ?: boolean;
  color?: string;
}
