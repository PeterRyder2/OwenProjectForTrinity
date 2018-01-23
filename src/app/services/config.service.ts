import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  apiAdress = 'http://192.168.99.41:4300';
  // apiAdress = 'http://82.165.69.131';
  // apiAdress = 'http://192.168.99.41:8085';
  debug = false;

  constructor() { }
}
