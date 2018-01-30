import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  debug = false;
  apiAdress = 'http://82.165.69.131';
  // apiAdress = 'http://192.168.99.41:3054';

  constructor() { }
}
