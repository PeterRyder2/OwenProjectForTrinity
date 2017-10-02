import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-vf14-description',
  templateUrl: './vf14-description.component.html',
  styleUrls: ['./vf14-description.component.scss']
})
export class Vf14DescriptionComponent implements OnInit, IDescriptionComponent {

  get language() {
    return this.languageService.components.vision.questionnaireDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    return true;
  }
}
