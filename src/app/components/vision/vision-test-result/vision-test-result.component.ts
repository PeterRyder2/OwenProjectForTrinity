import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-vision-test-result',
  templateUrl: './vision-test-result.component.html',
  styleUrls: ['./vision-test-result.component.scss']
})
export class VisionTestResultComponent implements OnInit, IResultComponent {

  resultData: ITestResult<any>;

  get language() {
    return this.languageService.components.vision.testResult;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

}
