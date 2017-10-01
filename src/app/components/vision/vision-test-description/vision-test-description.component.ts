import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vision-test-description',
  templateUrl: './vision-test-description.component.html',
  styleUrls: ['./vision-test-description.component.scss']
})
export class VisionTestDescriptionComponent implements OnInit, IDescriptionComponent {

  page = 0;

  constructor() { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    this.page++;
    if (this.page > 2)
      return true;
    else
      return false;
  }
}
