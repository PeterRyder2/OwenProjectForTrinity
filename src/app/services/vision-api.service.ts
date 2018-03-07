import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { IQuestionnaireResponse } from '../components/questionnaire/questionnaire.component';
import { VisionTestData } from '../components/vision/vision-test/vision-test.component';

@Injectable()
export class VisionApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }

  saveTest(input: { id: string, test: VisionTestData }) {
    return this.http.post(`${this.url}/vision/test`, input).map(res => res.text()).toPromise();
  }

  saveQuestionnaire(input: { id: string, questionnaire: IQuestionnaireResponse }) {
    return this.http.post(`${this.url}/vision/questionnaire`, input).map(res => res.text()).toPromise();
  }

}
