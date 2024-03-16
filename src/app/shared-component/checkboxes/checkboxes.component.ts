import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Checkboxes } from './checkboxes';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.sass']
})
export class CheckboxesComponent implements OnInit {

  @Input() options: Checkboxes[] = [];
  @Input() allComplete: boolean;
  @Output() checkedEvent = new EventEmitter<any>();

  checkedChange(checked: boolean) {
    if (!checked) this.allComplete = false;
    const checkedItem = this.options.filter(item => item.checked === true);
    this.checkedEvent.emit({
      allChecked: this.allComplete,
      checked: checkedItem
    });
  }

  updateAllComplete() {
    const self = this;
    this.options.forEach(t => {
      t.checked = self.allComplete;
    });
    this.checkedEvent.emit({
      allChecked: this.allComplete,
      checked: this.options
    });
  }

  constructor() { }

  ngOnInit(): void {
    this.allComplete = this.options.every((o) => o.checked === true);
    const checkedItem = this.options.filter(item => item.checked === true);
    this.checkedEvent.emit({
      allChecked: this.allComplete,
      checked: checkedItem
    });
  }

}
