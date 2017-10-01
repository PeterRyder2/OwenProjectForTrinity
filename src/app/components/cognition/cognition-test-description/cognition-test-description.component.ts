import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-cognition-test-description',
  templateUrl: './cognition-test-description.component.html',
  styleUrls: ['./cognition-test-description.component.scss']
})
export class CognitionTestDescriptionComponent implements OnInit, IDescriptionComponent {

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
