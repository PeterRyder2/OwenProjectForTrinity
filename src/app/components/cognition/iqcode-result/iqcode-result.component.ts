import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-iqcode-result',
  templateUrl: './iqcode-result.component.html',
  styleUrls: ['./iqcode-result.component.scss']
})
export class IqcodeResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult;

  constructor() { }

  ngOnInit() {
  }

}
