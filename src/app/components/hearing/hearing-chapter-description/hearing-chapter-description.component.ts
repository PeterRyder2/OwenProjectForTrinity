import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-hearing-chapter-description',
  templateUrl: './hearing-chapter-description.component.html',
  styleUrls: ['./hearing-chapter-description.component.scss']
})
export class HearingChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  get language() {
    return this.languageService.components.hearing.chapterDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    return true;
  }
}
