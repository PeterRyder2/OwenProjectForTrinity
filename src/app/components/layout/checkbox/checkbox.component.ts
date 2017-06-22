import { Component, OnInit, Input, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'snscg-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @HostBinding('style.cursor') pointer = 'pointer';

  @Input() checked = false;
  @Output() toggleSelect = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click') toggleCheck() {
    this.checked = !this.checked;
    this.toggleSelect.emit(this.checked);
  }

}
