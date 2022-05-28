import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchEmploye'
})
export class SearchEmployePipe implements PipeTransform {

// value - array of cities
// input - user input in search box
// when there is an input, filter & return all matches
// when there is no input, display all data
// filter() is a javascript method that returns a new array of all values that pass a test defined in the method. You can read more here


  transform(value: any, input: any): any {
    if (input) {
      return value.filter((val:any) => val.Nom.toLowerCase().indexOf(input.toLowerCase()) >= 0);
    } else {
      return value;
    }
   }
  }