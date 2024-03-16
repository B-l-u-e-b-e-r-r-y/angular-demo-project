// displayedColumns 要顯示哪些欄位
// columnViews 全部的欄位名稱
// dataSource 真正的資料

export interface Table {
  pageSize?: number;
  displayedColumns: string[];
  columnViews: string[];
  dataSource: any[];
}
