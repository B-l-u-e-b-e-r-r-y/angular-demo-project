import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Options } from './options';
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.sass']
})
export class OptionsComponent implements OnInit {

  @Output() selectedOptionEvent = new EventEmitter<Options>();
  @Input() selectedOption: string | number;
  @Input() data: Options[] = [];

  clickOption(item: Options) {
    this.selectedOptionEvent.emit(item);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
