import { Observable, interval, iif, of } from "rxjs";
import { mergeMap } from "rxjs/operators";

export const multipleOfFour: Observable<number> = interval(1000).pipe(
  mergeMap(v => iif(() => v % 4 === 0, of(v), of(-1 * v)))
);
/*
  06a 0 06A   
  06a -1 06A  
  06a -2 06A  
  06a -3 06A  
  06a 4 06A   
  06a -5 06A  
  06a -6 06A  
  06a -7 06A  
  06a 8 06A   
  06a -9 06A  
  06a -10 06A 
  06a -11 06A 
  06a 12 06A
 */
export const onlyTheFourth: Observable<unknown> = interval(1000).pipe(
  mergeMap(v => iif(() => v % 4 === 0, of(v)))
);
/*
  06b 0 06B  
  06b 4 06B  
  06b 8 06B  
  06b 12 06B 
  06b 16 06B 
  06b 20 06B 
  06b 24 06B 
  06b 28 06B 
  06b 32 06B 
  06b 36 06B 
  06b 40 06B 
  06b 44 06B 
  06b 48 06B 
 */
