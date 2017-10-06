import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-digit-triple-test-result',
  templateUrl: './digit-triple-test-result.component.html',
  styleUrls: ['./digit-triple-test-result.component.scss']
})
export class DigitTripleTestResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult<any>;

  constructor() { }

  ngOnInit() {
  }

}
