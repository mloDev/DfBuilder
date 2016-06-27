import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ngForNumber'})
export class NgForNumber implements PipeTransform {
        numbers: number[];
  transform(value, args:string[]) : any {
    this.numbers = Array(value).fill(1);
    return this.numbers;
  }
}