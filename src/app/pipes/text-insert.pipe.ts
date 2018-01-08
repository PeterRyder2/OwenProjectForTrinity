import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textInsert'
})
export class TextInsertPipe implements PipeTransform {

  transform(value: string, args: InsertArgs): any {
    for (let arg of args) {
      value = value.replace(new RegExp(arg.find, 'g'), arg.ins);
    }
    return value;
  }

}

export type InsertArgs = IInsertArg[];

interface IInsertArg {
  find: string;
  ins: string;
}
