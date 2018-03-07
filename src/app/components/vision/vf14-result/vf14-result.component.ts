import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { Http } from '@angular/http';
import { IQuestionnaireResponse } from '../../questionnaire/questionnaire.component';
import { LanguageService } from '../../../services/language.service';
import { MailApiService } from '../../../services/mail-api.service';
import { SettingsService } from '../../../services/settings.service';
import { IdService } from '../../../services/id.service';
import { VisionApiService } from '../../../services/vision-api.service';

@Component({
  selector: 'snscg-vf14-result',
  templateUrl: './vf14-result.component.html',
  styleUrls: ['./vf14-result.component.scss']
})
export class Vf14ResultComponent implements OnInit, IResultComponent {

  score = 0;
  _resultData: ITestResult<IQuestionnaireResponse>;
  set resultData(val: ITestResult<IQuestionnaireResponse>) {
    this._resultData = val;
    if (val.result.answeredQuestions > 0) {
      this.score = val.result.score / val.result.answeredQuestions * 25;
      // Math.round(this.score);
      this.score = parseFloat(this.score.toFixed(2));
    } else
      this.score = null;

    if (this.settings.sendEmail) {
      var message = 'Id: ' + this.idService.id.toString() + '\nScore: ' + this.score.toString();
      this.mailer.sendMail('VF14-Data - ' + this.idService.id.toString(), message);
    }
    this.sendToServer();
    console.log(val.result, this.score);
  }

  async sendToServer(){
    let res = await this.visionApiService.saveQuestionnaire({id: this.idService.id, questionnaire: this._resultData.result});
    console.log(res);
  }

  email: string;
  name: string;
  message: string;
  endpoint: string;

  get language() {
    return this.languageService.components.vision.questionnaireResult;
  }

  constructor(public languageService: LanguageService, private http: Http, public settings: SettingsService, private visionApiService: VisionApiService, private mailer: MailApiService, private idService: IdService) { this.http = http; }

  ngOnInit() {
  }
}
