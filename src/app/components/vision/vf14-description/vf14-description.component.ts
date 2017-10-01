import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vf14-description',
  templateUrl: './vf14-description.component.html',
  styleUrls: ['./vf14-description.component.scss']
})
export class Vf14DescriptionComponent implements OnInit, IDescriptionComponent {

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
