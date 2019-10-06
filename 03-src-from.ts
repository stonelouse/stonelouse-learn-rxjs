import { from, Observable } from 'rxjs';

/*
  from<T>(input: ObservableInput<T>, scheduler?: SchedulerLike): Observable<T>

  Creates an Observable from 
  ... an Array, 
  ... an array-like object, 
  ... a Promise, 
  ... an iterable object, or 
  ... an Observable-like object.

  !!! Can be used to convert a promise to an observable!
  !!! For arrays and iterables, all contained values will be emitted as a sequence!
 */
export const arraySource: Observable<Number> = from([1, 2, 3, 4, 5, 6]);
/*
  1
  2
  3
  4
  5
  6
 */
 
const promise: Promise<string> = new Promise<string>(
  (
    resolve: (response?: string) => void,
    reject: (reason: unknown) => void
  ) => setTimeout(_ => resolve('Hello from Promise'), 2000)
);
export const promiseSource: Observable<string> = from(promise);
/*
  Hello from Promise // ... two seconds delayed
 */

export const stringSource: Observable<string> = from('Ghost');
/*
  G
  h
  o
  s
  t
 */

function* generateFibos(): Iterator<number> {
  let last: number = 1;
  let beforeLast: number = 1;
  let next: number =0;

  while (true) {

    switch (next) {
      case 0: {
        yield 0;
        break;
      }
      case 1: 
      case 2: {
        yield 1;
        break;
      }
      default: {
        const result: number = beforeLast + last;
        yield result;
        beforeLast = last;
        last = result;
        break;
      }
    }
    next++;
  }
}

const iterator: Iterator<number> = generateFibos();
/*
  Argument of type 
      'Iterator<number, any, undefined>' 
  is not assignable to parameter of type 
      'ObservableInput<any>'.
  Property '[Symbol.iterator]' is missing in type 
      'Iterator<number, any, undefined>' 
  but required in type 
      'Iterable<any>'.
  ... with rxjs 6.5.2 and stackblitz's TypeScript version on 10/6/19
  
  Generics are always a pain
  ... use workaround from https://github.com/bloadvenro
      ... see https://github.com/ReactiveX/rxjs/issues/2306 at the bottom
 */
// export const iteratorSource: Observable<number> = from(iterator);
export const iteratorSource: Observable<number> = from(((iterator as unknown) as Array<number>));

