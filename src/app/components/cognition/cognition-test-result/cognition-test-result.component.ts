import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-cognition-test-result',
  templateUrl: './cognition-test-result.component.html',
  styleUrls: ['./cognition-test-result.component.scss']
})
export class CognitionTestResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult;

  constructor() { }

  ngOnInit() {
  }

}
