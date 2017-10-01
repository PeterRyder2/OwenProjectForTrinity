import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-digit-triple-test-description',
  templateUrl: './digit-triple-test-description.component.html',
  styleUrls: ['./digit-triple-test-description.component.scss']
})
export class DigitTripleTestDescriptionComponent implements OnInit, IDescriptionComponent {

  page = 0;

  constructor() { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    this.page++;
    if (this.page > 1)
      return true;
    else
      return false;
  }
}
