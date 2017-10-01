import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-hdda-description',
  templateUrl: './hdda-description.component.html',
  styleUrls: ['./hdda-description.component.scss']
})
export class HddaDescriptionComponent implements OnInit, IDescriptionComponent {

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
