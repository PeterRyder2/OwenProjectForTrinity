import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-iqcode-description',
  templateUrl: './iqcode-description.component.html',
  styleUrls: ['./iqcode-description.component.scss']
})
export class IqcodeDescriptionComponent implements OnInit, IDescriptionComponent {

  get language() {
    return this.languageService.components.cognition.questionnaireDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    return true;
  }
}
