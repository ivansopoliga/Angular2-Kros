/**
 * Created by Tibor Poštek on 27.07.2016.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cell',
  pure: true
})
export class CellPipe  implements PipeTransform{

  constructor(){}

  transform(value:string, args:string[]):any {
    return value?value : args[0];
  }
}
