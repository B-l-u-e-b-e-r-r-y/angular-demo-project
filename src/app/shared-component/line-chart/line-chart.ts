export interface LineChart {
    xAxis: string[] | number[];
    lines: Line[];
    xName?: string;
    yName?: string;
}

interface Line {
    name: string;
    values: number[];
}