import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faClock, faBars, faSearch, faInfoCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { DialogService } from '../../services/dialog.service';
import { ComponentService } from '../../services/component/component.service';
import { FilterOption } from '../interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {

  @Input() title: string = '';
  @Input() dataTime: string = '';
  @Input() filterString: string = '';
  @Input() fullFilterString: string = '';
  @Input() componentName: string = '';
  @Output() filterEventEmitter = new EventEmitter<FilterOption>();

  // options
  isDetail: boolean = true;
  isFilter: boolean = true;
  isFilterString: boolean;

  // fontawesome icon
  faClock = faClock;
  faBars = faBars;
  faSearch = faSearch;
  faInfoCircle = faInfoCircle;
  faFilter = faFilter;

  getData() {
    const key = this.componentName;
    const data = this.componentService.get(key);
    return {
      title: this.title,
      dataTime: this.dataTime,
      filterString: this.filterString,
      fullFilterString: this.fullFilterString,
      component: key,
      data: data
    };
  }

  showOptions() {
    const data = this.getData();
    if (!data.data) return;
    this.isDetail = data.data.isDetail;
    this.isFilter = data.data.isFilter;
  }

  openChartDialog() {
    const data = this.getData();
    this.dialogService.openChartDialog(data);
  }

  openDetailDialog() {
    const data = this.getData();
    this.dialogService.openDetailDialog(data);
  }

  openFilterDialog() {
    const data = this.getData();
    const dialogRef = this.dialogService.openFilterDialog(data);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterEventEmitter.emit(result);
      }
    });
  }

  constructor(
    private componentService: ComponentService,
    private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.showOptions();
    this.isFilterString = this.filterString.length > 0;
  }

}