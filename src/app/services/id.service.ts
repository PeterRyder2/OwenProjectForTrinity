import { Util } from '../lib/util';
import { Injectable } from '@angular/core';

@Injectable()
export class IdService {

  wasSet = false;
  private _id;
  set id(value: string) {
    this.wasSet = true;
    this._id = value;
  }
  get id() {
    return this._id;
  }

  private _annotation;
  set annotation(value: string) {
    this._annotation = value;
  }
  get annotation() {
    if (this._annotation === undefined)
      return this._annotation = 'no annotation given';
    return this._annotation;
  }

  get isIdSet() {
    return this._id !== undefined && this._id !== null;
  }

  constructor() { }

  generateId(prefix?: string) {
    prefix = prefix ? prefix + '-' : '';
    this.wasSet = false;
    return this._id = prefix + Util.generateUUID();
  }

  reset() {
    this._id = this._annotation = undefined;
  }

}
