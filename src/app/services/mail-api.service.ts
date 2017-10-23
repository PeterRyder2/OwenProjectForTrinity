import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { IQuestionnaire } from '../interfaces/IQuestionnaire.interface';

@Injectable()
export class MailApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }
  sendMail(subject: string, text: any) {
    return this.http.post(`${this.url}/mail`, {subject: subject, text: text}).map(res => res).toPromise();
  }
}
