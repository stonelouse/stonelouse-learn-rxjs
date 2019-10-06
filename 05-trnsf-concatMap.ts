import { of, Observable } from "rxjs";
import { concatMap, delay, mergeMap } from "rxjs/operators";

/*
  concatMap<T, R, O extends ObservableInput<any>>(
      project: (value: T, index: number) => O, 
      resultSelector?: (outerValue: T, innerValue: ObservedValueOf<O>, outerIndex: number, innerIndex: number) => R
  ): OperatorFunction<T, ObservedValueOf<O> | R>

  Projects each source value to an Observable 
  ... which is merged in the output Observable, 
  ... in a serialized fashion waiting for each one to complete before merging the next.

  concatMap:
  ==========
  ---  1 -----------------  3 ------  5 ------------------------------------|-->         

  --- 10 --- 10 --- 10 ---|-->

  concatMap( i => 10 * i --- 10 * i --- 10 * i ---|)

  --- 10 --- 10 --- 10 --- 30 --- 30 --- 30 50 --- 50 --- 50 ---------------|-->

  mergeMap:
  =========
  ---  1 -----------------  3 ------  5 ------------------------------------|-->         

  --- 10 --- 10 --- 10 ---|-->

  mergeMap( i => 10 * i --- 10 * i --- 10 * i ---|)

  --- 10 --- 10 --- 10 --- 30 --- 30 -50 30 --- 50 --- 50 ------------------|-->
   
   The difference between concatMap and mergeMap:
   ==============================================
   ... concatMap does not subscribe to the next observable until the previous completes 
   ... mergeMap subscribes immediately to inner observables
   */
export const concatMap1Src: Observable<number> = of(1, 2, 3).pipe(
  concatMap((n: number) => of(n * 10, n * 10, n * 10).pipe(delay(300 / n)))
);
/*
  src05ConcatMap1Src.subscribe() separately
  10
  10
  10
  20
  20
  20
  30
  30
  30
 */
export const mergeMap1Src: Observable<number> = of(1, 2, 3).pipe(
  mergeMap(((n: number) => of(n * 10, n * 10, n * 10).pipe(delay(300 / n))))
);
/*
  src05MergeMap1Src.subscribe() separately
  30
  30
  30
  20
  20
  20
  10
  10
  10
 */
/*
  src05ConcatMap1Src.subscribe() and src05MergeMap1Src.subscribe() combined
  05b 30 05B
  05b 30 05B
  05b 30 05B
  05b 20 05B
  05b 20 05B
  05b 20 05B
  05a 10 05A
  05a 10 05A
  05a 10 05A
  05b 10 05B
  05b 10 05B
  05b 10 05B
  05a 20 05A
  05a 20 05A
  05a 20 05A
  05a 30 05A
  05a 30 05A
  05a 30 05A
 */
