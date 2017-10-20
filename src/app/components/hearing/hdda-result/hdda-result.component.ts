import { Component, OnInit } from '@angular/core';
import { IResultComponent, ITestResult } from '../../../interfaces/IProcedureConfig.interface';
import { Http } from '@angular/http';
import { IQuestionnaireResponse } from '../../questionnaire/questionnaire.component';

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
    this.initEmail('Piers.Dawes@manchester.ac.uk');
    this.initEmail('zoe.simkin@manchester.ac.uk');
    this.initEmail('m.manstein-klein@hoertech.de');
    this.initEmail('t.wittkop@hoertech.de');
    console.log(val.result, this.score);
  }

  email: string;
  name: string;
  message: string;
  endpoint: string;

  constructor(private http: Http) { this.http = http; }

  ngOnInit() {
  }

  initEmail(email: string) {
    // This data could really come from some inputs on the interface - but let's keep it simple.
    // this.email = 'm.manstein-klein@hoertech.de';
    this.email = email;
    this.name = 'SenseCog Q';
    this.message = 'HDDA Score: ' + this.score;

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
