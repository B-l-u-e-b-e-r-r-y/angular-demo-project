import { Options, Checkboxes } from '../../shared-component/interfaces';

export interface Component {
    type: 'bar' | 'line' | 'heatmap' | 'trend-line';
    data: any;
    detail?: any;
    isDetail: boolean;
    isFilter: boolean;
    chartDialogWidth: number;   // 單位: vw
    detailDialogWidth: number;  // 單位: vw
    fileName: string;
    detailEngToZhTw: any;       // 英文表頭轉中文
    removeCols?: string[];      // 要刪除的欄位
    filter?: Filter;
}

interface Filter {
    datepicker: Datepicker;
    district: boolean;         // 行政區
    districtReName?: string;   // 行政區重新命名
    districtSelected?: string; // 選擇的行政區
    options?: OptionsFilter;         // 特殊選項，單選 radio button
    checkboxes?: CheckboxesFilter;   // 特殊選項，多選 checkbox
    dataTime?: DataTimeFilter;       // 預設時間
}

interface Datepicker {
    year: boolean;     // 年
    month: boolean;    // 月
    date: boolean;     // 日
    singleDate?: boolean; // 單一日期
    hour: boolean;     // 時
    weekday: boolean;  // 平假日
    peakhour: boolean;
}

interface OptionsFilter {
    title: string;
    selected?: string;
    data: Options[];
}

interface CheckboxesFilter {
    title: string;
    allChecked: boolean;
    data: Checkboxes[];
}

interface DataTimeFilter {
    startTime?: string;
    endTime?: string;
}