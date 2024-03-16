import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.sass']
})
export class HourComponent implements OnInit {

  constructor() { }
  @Output() selectedHourEvent = new EventEmitter<number>();

  hours = [...Array(24).keys()]
  selected: number = 12;

  ngOnInit(): void {
  }

  afterSelect() {
    this.selectedHourEvent.emit(this.selected);
  }
}
