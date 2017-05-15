import { Component, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'snscg-yes-or-no-question',
  templateUrl: './yes-or-no-question.component.html',
  styleUrls: ['./yes-or-no-question.component.scss']
})
export class YesOrNoQuestionComponent implements OnInit {

  @Input() question;

  constructor(public _langugeService: LanguageService) { }

  ngOnInit() {
  }

}
