import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[snscgProcedureHost]'
})
export class ProcedureHostDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
