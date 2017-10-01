import { Component, OnInit } from '@angular/core';
import { ITestResponse, IDescriptionComponent } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-hearing-chapter-description',
  templateUrl: './hearing-chapter-description.component.html',
  styleUrls: ['./hearing-chapter-description.component.scss']
})
export class HearingChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  abc = 'ahahah'

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    console.log(this.abc)
    return true;
  }
}
