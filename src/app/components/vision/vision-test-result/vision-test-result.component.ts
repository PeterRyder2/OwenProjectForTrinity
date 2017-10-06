import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vision-test-result',
  templateUrl: './vision-test-result.component.html',
  styleUrls: ['./vision-test-result.component.scss']
})
export class VisionTestResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult<any>;

  constructor() { }

  ngOnInit() {
  }

}
