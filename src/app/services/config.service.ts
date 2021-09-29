import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  debug = false;
  apiAdress = 'http://82.165.69.131';

  constructor() { }
}
