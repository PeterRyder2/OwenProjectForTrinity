import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-cognition-test-description',
  templateUrl: './cognition-test-description.component.html',
  styleUrls: ['./cognition-test-description.component.scss']
})
export class CognitionTestDescriptionComponent implements OnInit, IDescriptionComponent {

  page = 0;

  get language() {
    return this.languageService.components.cognition.testDescription;
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
