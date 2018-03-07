import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';
import { Http } from '@angular/http';
import { IQuestionnaireResponse } from '../../questionnaire/questionnaire.component';
import { MailApiService } from '../../../services/mail-api.service';
import { SettingsService } from '../../../services/settings.service';
import { IdService } from '../../../services/id.service';
import { CognitionApiService } from '../../../services/cognition-api.service';

@Component({
  selector: 'snscg-iqcode-result',
  templateUrl: './iqcode-result.component.html',
  styleUrls: ['./iqcode-result.component.scss']
})
export class IqcodeResultComponent implements OnInit, IResultComponent {

  score = 0;
  _resultData: ITestResult<IQuestionnaireResponse>;
  set resultData(val: ITestResult<IQuestionnaireResponse>) {
    this._resultData = val;
    this.score = val.result.score / 16;
    // this.score = Math.round(this.score);
    this.score = parseFloat(this.score.toFixed(2));

    if (this.settings.sendEmail) {
      var message = 'Id: ' + this.idService.id.toString() + '\nScore: ' + this.score.toString();
      this.mailer.sendMail('IQCODE-Data - ' + this.idService.id.toString(), message);
    }
    this.sendToServer();
    console.log(val.result, this.score);
  }

  async sendToServer() {
    let res = await this.cognitionApiService.saveQuestionnaire({ id: this.idService.id, questionnaire: this._resultData.result });
    console.log(res);
  }

  email: string;
  name: string;
  message: string;
  endpoint: string;

  constructor(private http: Http, public settings: SettingsService, private mailer: MailApiService, private cognitionApiService: CognitionApiService, private idService: IdService) { this.http = http; }

  ngOnInit() {
  }
}
