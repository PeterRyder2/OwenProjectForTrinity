import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-hdda-description',
  templateUrl: './hdda-description.component.html',
  styleUrls: ['./hdda-description.component.scss']
})
export class HddaDescriptionComponent implements OnInit, IDescriptionComponent {

  get language() {
    return this.languageService.components.hearing.questionnaireDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    return true;
  }
}
