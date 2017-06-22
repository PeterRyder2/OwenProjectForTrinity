import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DttApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }

  initialize(input: { language: string, name: string }) {
    return this.http.post(`${this.url}/d3/init`, input).map(res => res.json() as ITripleResonse).toPromise();
  }

  next(input: { id: string, selectedTriple: string }) {
    return this.http.post(`${this.url}/d3/next`, input).map(res => res.json() as ITripleResonse).toPromise();
  }

  finish(input: { id: string, annotation: string }) {
    return this.http.post(`${this.url}/d3/finish`, input).map(res => res.json() as { Snr: number }).toPromise();
  }

  end(input: { id: string }) {
    return this.http.post(`${this.url}/d3/end`, input).map(res => res.text()).toPromise();
  }

}

export interface ITripleResonse {
  Id: string;
  End: boolean;
  Progress: number;
  AvgSnr: Number;
  TripleBuffer?: string;
}
