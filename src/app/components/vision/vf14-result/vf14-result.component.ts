import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vf14-result',
  templateUrl: './vf14-result.component.html',
  styleUrls: ['./vf14-result.component.scss']
})
export class Vf14ResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult;

  constructor() { }

  ngOnInit() {
  }

}
