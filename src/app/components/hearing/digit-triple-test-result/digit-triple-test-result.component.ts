import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-digit-triple-test-result',
  templateUrl: './digit-triple-test-result.component.html',
  styleUrls: ['./digit-triple-test-result.component.scss']
})
export class DigitTripleTestResultComponent implements OnInit, IResultComponent {

  score: number;
  _resultData: ITestResult<number>;
  set resultData(val: ITestResult<number>) {
    this._resultData = val;
    // this.score = Math.round(val.result);
    this.score = parseFloat(val.result.toFixed(2));
    console.log(val.result, this.score);
  }

  constructor() { }

  ngOnInit() {
  }

}
