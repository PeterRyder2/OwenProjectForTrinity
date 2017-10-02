import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-vision-test-description',
  templateUrl: './vision-test-description.component.html',
  styleUrls: ['./vision-test-description.component.scss']
})
export class VisionTestDescriptionComponent implements OnInit, IDescriptionComponent {

  page = 0;

  get language() {
    return this.languageService.components.vision.testDescription;
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
