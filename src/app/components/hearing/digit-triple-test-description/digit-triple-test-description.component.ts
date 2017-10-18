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
  playSound = false;
  audioF: any;

  get language() {
    return this.languageService.components.hearing.testDescription;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
    setTimeout(() => {
      this.showSound();
    }, 4000);
  }
  showSound() {
    this.playSound = true;
    /*this.audio = new Audio();
    this.audio.src = 'assets/' + this.languageService.components.hearing.testDescription.firstPage.soundFile;
    this.audio.load();
    this.audio.play();*/
  }
  continue = async (): Promise<boolean> => {
    this.page++;
    if (this.page > 1)
      return true;
    else
      return false;
  }
}
