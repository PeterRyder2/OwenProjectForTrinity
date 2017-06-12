import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[snscgFocus]'
})
export class FocusDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit() {
    (<HTMLElement>this.el.nativeElement).focus();
    console.log('focused');
  }

}
