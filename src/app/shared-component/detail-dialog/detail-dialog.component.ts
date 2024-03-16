import { Component, OnInit, Inject } from '@angular/core';
import { faTimes, faFileExport } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComponentService } from '../../services/component/component.service';
import { Component as Config } from '../../services/component/component';
import { Table } from '../interfaces';

@Component({
  selector: 'app-detail-dialog',
  templateUrl: './detail-dialog.component.html',
  styleUrls: ['./detail-dialog.component.sass']
})
export class DetailDialogComponent implements OnInit {

  tableData: Table;

  title: string;
  dataTime: string;
  data: any;
  fileName: string;

  faTimes = faTimes;
  faFileExport = faFileExport;

  getZhTwColsData(data: any, componentConfig: Config) {
    // 處理表頭英文轉中文
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      newData[i] = {};
      for (let col in data[i]) {
        let newCol = col;
        if (componentConfig.detailEngToZhTw.hasOwnProperty(col)) {
          newCol = componentConfig.detailEngToZhTw[col];
        }
        newData[i][newCol] = data[i][col];
      }
    }
    return newData;
  }

  getTableData(data: any, componentConfig: Config) {
    // 如果有 data
    if (data && data.length > 0) {
      // 如果有需要刪除的欄位
      if (componentConfig.removeCols) {
        data = data.map(item => {
          componentConfig.removeCols.forEach(col => delete item[col]);
          return item;
        });
      }

      this.data = this.getZhTwColsData(data, componentConfig);
      const table: Table = {
        dataSource: data,
        displayedColumns: Object.keys(data[0]),
        columnViews: Object.keys(this.data[0]),
        pageSize: 50
      };
      
      return table;
    }

    return {
      dataSource: [],
      displayedColumns: [],
      columnViews: [],
    };
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private componentService: ComponentService) {
    const component = data.component;
    const componentConfig = this.componentService.get(component);
    this.fileName = data.data.fileName;
    this.title = data.title;
    this.dataTime = data.dataTime;
    const _data = data.data.detail;
    this.tableData = this.getTableData(_data, componentConfig);
  }

  convertArrayOfObjectsToCSV(args) {
    const data = args.data || null;
    if (data === null || data.length < 1) return null;

    const columnDelimiter = args.columnDelimiter || ',';
    const lineDelimiter = args.lineDelimiter || '\n';
    const keys = Object.keys(data[0]);

    let result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;
        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  downloadCSV() {
    const csvContent = this.convertArrayOfObjectsToCSV({ data: this.data });
    if (csvContent === null) return;
    const filename = this.fileName + '.csv';
    const data = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

  ngOnInit() { }

}
