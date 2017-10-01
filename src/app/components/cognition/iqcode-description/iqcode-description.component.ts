import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-iqcode-description',
  templateUrl: './iqcode-description.component.html',
  styleUrls: ['./iqcode-description.component.scss']
})
export class IqcodeDescriptionComponent implements OnInit, IDescriptionComponent {

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
