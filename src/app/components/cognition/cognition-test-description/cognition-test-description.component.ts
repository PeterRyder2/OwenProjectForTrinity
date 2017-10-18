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
  playSound = false;

  get language() {
    return this.languageService.components.cognition.testDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showSound();
    }, 4000);
  }

  showSound() {
    this.playSound = true;
  }

  continue = async (): Promise<boolean> => {
    this.page++;
    if (this.page > 1)
      return true;
    else
      return false;
  }
}
