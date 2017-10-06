import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import { IQuestionnaire } from '../interfaces/IQuestionnaire.interface';

@Injectable()
export class CognitionApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }
  initialize(input: { language: string, name: string }) {
    return this.http.post(`${this.url}/cognition/init`, input).map(res => res.json() as CognitionInitResponse).toPromise();
  }

  finish(input: { id: string, wordRes: ICognitionTestRespone[], annotation: string }) {
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
