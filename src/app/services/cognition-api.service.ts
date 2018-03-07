import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { IQuestionnaire } from '../interfaces/IQuestionnaire.interface';
import { IQuestionnaireResponse } from '../components/questionnaire/questionnaire.component';

@Injectable()
export class CognitionApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }
  initialize(input: { language: string, name: string }) {
    return this.http.post(`${this.url}/cognition/init`, input).map(res => res.json() as CognitionInitResponse).toPromise();
  }

  saveQuestionnaire(input: { id: string, questionnaire: IQuestionnaireResponse }) {
    return this.http.post(`${this.url}/cognition/questionnaire`, input).map(res => res.text()).toPromise();
  }

  finish(input: { id: string, wordRes: ICognitionTestRespone[], annotation: string, sendMail: boolean }) {
    return this.http.post(`${this.url}/cognition/finish`, input).map(res => res.json() as ICognitionTestResult).toPromise();
  }
  getWord(input: { id: string, word: string }) {
    return this.http.post(`${this.url}/cognition/word`, input).map(res => res.json() as { sound: string }).toPromise();
  }
}

export interface CognitionInitResponse {
  ID: string;
  PresentWords: string[];
  TestWords: string[];
  Questionaire: IQuestionnaire;
}

export interface ICognitionTestRespone {
  Word: string;
  Seen: boolean;
};

export interface ICognitionTestResult {
  SeenCorrect: number;
  SeenWrong: number;
  NotSeenCorrect: number;
  NotSeenWrong: number;
}
