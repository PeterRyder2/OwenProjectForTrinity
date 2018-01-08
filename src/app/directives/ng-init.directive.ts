import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[snscgNgInit]'
})
export class NgInitDirective implements OnInit {
  @Input() values: any = {};

  @Input() snscgNgInit;
  ngOnInit() {
    if (this.snscgNgInit) { this.snscgNgInit(); }
  }
}
