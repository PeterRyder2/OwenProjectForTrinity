import { LanguageService } from '../../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-cognition-chapter-description',
  templateUrl: './cognition-chapter-description.component.html',
  styleUrls: ['./cognition-chapter-description.component.scss']
})
export class CognitionChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  get language(){
    return this.languageService.components.cognition.chapterDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
