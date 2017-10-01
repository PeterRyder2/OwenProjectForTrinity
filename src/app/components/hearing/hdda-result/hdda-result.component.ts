import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-hdda-result',
  templateUrl: './hdda-result.component.html',
  styleUrls: ['./hdda-result.component.scss']
})
export class HddaResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult;

  constructor() { }

  ngOnInit() {
  }

}
