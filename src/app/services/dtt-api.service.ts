import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { ConfigService } from './config.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DttApiService {

  url = '';

  constructor(private http: Http, private config: ConfigService) {
    this.url = config.apiAdress;
  }

  initialize() {
    return this.http.get(`${this.url}/d3/init`).map(res => res.json() as IStartResonse).toPromise();
  }

  next(id: string, selectedTriple: string) {
    return this.http.post(`${this.url}/d3/next`, { id: id, triple: selectedTriple }).map(res => res.text()).toPromise();
  }

  finish(id: string) {
    return this.http.post(`${this.url}/d3/finish`, { id: id }).map(res => res.json()).toPromise();
  }

  end(id: string) {
    return this.http.post(`${this.url}/d3/end`, { id: id }).map(res => res.text()).toPromise();
  }

}

interface IStartResonse {
  Id: string;
  TriplesCount: number;
  TripleBuffer: string;
}
