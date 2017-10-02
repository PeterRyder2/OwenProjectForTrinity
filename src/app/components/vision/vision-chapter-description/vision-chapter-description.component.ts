import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'snscg-vision-chapter-description',
  templateUrl: './vision-chapter-description.component.html',
  styleUrls: ['./vision-chapter-description.component.scss']
})
export class VisionChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  get language() {
    return this.languageService.components.vision.chapterDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  continue = async (): Promise<boolean> => {
    return true;
  }
}
