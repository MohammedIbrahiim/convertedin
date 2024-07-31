import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceForTitle',
  standalone: true
})
export class SliceToIsPipe implements PipeTransform {
  transform(value: string): string {
    const index = value.indexOf(' is');
    return index !== -1 ? value.slice(0, index) : value;
  }

}
