import { SettingsService } from '../../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';
import { Http } from '@angular/http';
import { IQuestionnaireResponse } from '../../questionnaire/questionnaire.component';
import { MailApiService } from '../../../services/mail-api.service';
import { IdService } from '../../../services/id.service';
import { HearingApiService } from '../../../services/hearing-api.service';



@Component({
  selector: 'snscg-hdda-result',
  templateUrl: './hdda-result.component.html',
  styleUrls: ['./hdda-result.component.scss']
})



export class HddaResultComponent implements OnInit, IResultComponent {
  
  score = 0;
  _resultData: ITestResult<IQuestionnaireResponse>;
  set resultData(val: ITestResult<IQuestionnaireResponse>) {
    this._resultData = val;
    // this.score = val.result.score;
    this.score = parseFloat(val.result.score.toFixed(2));
    if (this.settings.sendEmail) {
      var message = 'Id: ' +  this.idService.id.toString() + '\nScore: ' + this.score.toString() ;
      this.mailer.sendMail('HDDA-Data - ' + this.idService.id.toString(), message);
    }
    this.sendToServer();
    console.log(val.result, this.score);
  }

  async sendToServer(){
    let res = await this.hearingApiService.saveQuestionnaire({id: this.idService.id, questionnaire: this._resultData.result});
    console.log(res);
  }

  email: string;
  name: string;
  message: string;
  endpoint: string;

  constructor(private http: Http, public settings: SettingsService, private mailer: MailApiService, private idService: IdService, private hearingApiService: HearingApiService) { this.http = http; }

  ngOnInit() {
  }
}
