import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'snscg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() checked = false;
  @Output() toggleSelect = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggleCheck() {
    this.checked = !this.checked;
    this.toggleSelect.emit(this.checked);
  }

}
