import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-cognition-chapter-description',
  templateUrl: './cognition-chapter-description.component.html',
  styleUrls: ['./cognition-chapter-description.component.scss']
})
export class CognitionChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
