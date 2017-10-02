import { IProcedure } from '../../interfaces/IProcedureConfig.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'snscg-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.scss']
})
export class ChapterSelectionComponent implements OnInit {

  @Output() disableContinueChanged = new EventEmitter<boolean>();

  procedure: IProcedure;

  chaptersToSkip: string[] = [];

  get language() {
    return this.languageService.components.chapterSelection;
  }

  constructor(public languageService: LanguageService) { }

  ngOnInit() {
  }

  subscribeContinueDisabled(cb: (isDisabled: boolean) => void): void {
    this.disableContinueChanged.subscribe(cb);
  }

  selectChapter(select: boolean, chapterName: string) {
    if (select)
      this.chaptersToSkip = this.chaptersToSkip.filter(val => val !== chapterName);
    else
      this.chaptersToSkip.push(chapterName);
    this.checkNoChaptersSelected();
  }

  checkNoChaptersSelected() {
    let chaptersLeft = false;
    for (let chapter of this.procedure.chapters) {
      if (!this.chaptersToSkip.includes(chapter.name)) {
        chaptersLeft = true;
        break;
      }
    }
    this.disableContinueChanged.emit(!chaptersLeft);
  }

  isChapterSkipped(chapterName) {
    return this.chaptersToSkip.includes(chapterName);
  }

}
