import { IProcedure } from '../../intefaces/IProcedureConfig.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'snscg-chapter-selection',
  templateUrl: './chapter-selection.component.html',
  styleUrls: ['./chapter-selection.component.scss']
})
export class ChapterSelectionComponent implements OnInit {

  procedure: IProcedure;

  chaptersToSkip: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  selectChapter(select: boolean, chapterName: string) {
    if (select)
      this.chaptersToSkip = this.chaptersToSkip.filter(val => val !== chapterName);
    else
      this.chaptersToSkip.push(chapterName);
    console.log(this.chaptersToSkip)
  }

  isChapterSkipped(chapterName) {
    return this.chaptersToSkip.includes(chapterName);
  }

}
