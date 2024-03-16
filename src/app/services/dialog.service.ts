import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartDialogComponent } from '../shared-component/chart-dialog/chart-dialog.component';
import { DetailDialogComponent } from '../shared-component/detail-dialog/detail-dialog.component';
import { FilterDialogComponent } from '../shared-component/filter-dialog/filter-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from './component/component';
import { FilterOption } from '../shared-component/interfaces';

interface Data {
  title: string;
  dataTime: string;
  filterString: string;
  component: string;
  data: Component;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  filterData: FilterOption;

  constructor(
    private matDialog: MatDialog) {}

  openChartDialog(data: Data): Observable<any> {
    const dialogWidth = data.data.chartDialogWidth;
    return this.matDialog.open(ChartDialogComponent, {
      width: dialogWidth + 'vw',
      data: data
    }).afterClosed();
  }

  openDetailDialog(data: Data): Observable<any> {
    const dialogWidth = data.data.detailDialogWidth;
    return this.matDialog.open(DetailDialogComponent, {
      width: dialogWidth + 'vw',
      data: data
    }).afterClosed();
  }

  openFilterDialog(data: Data): any {
    return this.matDialog.open(FilterDialogComponent, {
      width: '50vw',
      data: data
    });
  }
}
