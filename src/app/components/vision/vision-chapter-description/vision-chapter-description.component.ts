import { Component, OnInit } from '@angular/core';
import { IDescriptionComponent, ITestResponse } from '../../../intefaces/IProcedureConfig.interface';

@Component({
  selector: 'snscg-vision-chapter-description',
  templateUrl: './vision-chapter-description.component.html',
  styleUrls: ['./vision-chapter-description.component.scss']
})
export class VisionChapterDescriptionComponent implements OnInit, IDescriptionComponent {

  constructor() { }

  ngOnInit() {
  }

  continue = async(): Promise<boolean> => {
    return true;
  }
}
