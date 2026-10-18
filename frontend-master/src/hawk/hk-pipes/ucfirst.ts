import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ucfirst',
})
export class UcFirstPipe implements PipeTransform {
  transform(value: string, ...args) {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }
}
