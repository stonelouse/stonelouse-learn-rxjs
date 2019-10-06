import { of } from 'rxjs'; 
import { map } from 'rxjs/operators';


export const source = of('rxjs').pipe(
  map(x => `Hello ${x}!`)
);
