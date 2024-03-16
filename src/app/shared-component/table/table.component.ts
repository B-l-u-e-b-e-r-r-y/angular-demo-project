import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Table } from './table';

export interface TableData {
  columns: string;
  content: number | string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})

export class TableComponent implements OnInit, OnChanges {
  constructor() { }

  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('tableSort', { static: true }) matSort: MatSort;
  @Input() data: Table = {
    pageSize: 5,
    displayedColumns: [],
    columnViews: [],
    dataSource: [],
  };

  pageSize: number = 5;
  displayedColumns = [];
  columnViews = [];
  dataSource: MatTableDataSource<any>;
  
  ngOnInit() {
  }

  ngOnChanges(changeItems) {
    if (changeItems.data) {
      this.data = changeItems.data.currentValue;
      this.displayedColumns = this.data.displayedColumns;
      this.columnViews = this.data.columnViews;
      this.dataSource = new MatTableDataSource(this.data.dataSource);
      this.pageSize = this.data.pageSize;
      this.dataSource.data = this.data.dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matSort;
    }
  }

}
