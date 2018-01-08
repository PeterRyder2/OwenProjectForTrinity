import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-digit-triple-test-description',
  templateUrl: './digit-triple-test-description.component.html',
  styleUrls: ['./digit-triple-test-description.component.scss']
})
export class DigitTripleTestDescriptionComponent implements OnInit, IDescriptionComponent {

  page = 0;

  get language() {
    return this.languageService.components.hearing.testDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    this.page++;
    if (this.page > 2)
      return true;
    else
      return false;
  }
}
