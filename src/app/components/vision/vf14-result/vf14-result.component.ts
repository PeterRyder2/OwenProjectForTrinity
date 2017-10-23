import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult, ITestResponse } from '../../../interfaces/IProcedureConfig.interface';
import { Http } from '@angular/http';
import { IQuestionnaireResponse } from '../../questionnaire/questionnaire.component';
import { LanguageService } from '../../../services/language.service';
import { MailApiService } from '../../../services/mail-api.service';
import { SettingsService } from '../../../services/settings.service';


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

      if (this.settings.sendEmail)
        this.mailer.sendMail('VF14-Result', this.score);
      
      //this.initEmail('Piers.Dawes@manchester.ac.uk');
      //this.initEmail('zoe.simkin@manchester.ac.uk');
      //this.initEmail('m.manstein-klein@hoertech.de');
      //this.initEmail('t.wittkop@hoertech.de');
      console.log(val.result, this.score);
  }

  email: string;
  name: string;
  message: string;
  endpoint: string;

  get language() {
    return this.languageService.components.vision.questionnaireResult;
  }

  constructor(public languageService: LanguageService, private http: Http, public settings: SettingsService, private mailer: MailApiService) { this.http = http; }

  ngOnInit() {
  }
  initEmail(email: string) {
    // This data could really come from some inputs on the interface - but let's keep it simple.
    // this.email = 'm.manstein-klein@hoertech.de';
    this.email = email;
    this.name = 'SenseCog Q';
    this.message = 'VF14 Score: ' + this.score;

    // Start php via the built in server: $ php -S localhost:8000
    this.endpoint = 'http://sensecog.hoertech.de/mailer_echecker.php';

    this.sendEmail();
    console.log(this.resultData);
  }
  sendEmail() {
    let postVars = {
      email: this.email,
      name: this.name,
      message: this.message
    };
    console.log('#sendEmail');
    // You may also want to check the response. But again, let's keep it simple.
    this.http.post(this.endpoint, postVars)
      .subscribe(
      response => console.log(response),
      response => console.log(response)
      )
  }
}
