import { of, Observable } from "rxjs";

/*
  of<T>(...args: Array<T | SchedulerLike>): Observable<T>

  Converts the arguments to an observable sequence.
  ... Returns an Observable that emits the arguments described above and then completes.
  ... Each argument becomes a next notification.
 */
export const seqSource: Observable<number> = of( 0, 1, 1, 2, 3, 5);
/*
  0
  1
  1
  2
  3
  5
  sequence source completed
 */

export const arraySource: Observable<number[]> = of( [0, 1, 1, 2, 3, 5]);
/*
  .schedule()
  Array(6) [ 0, 1, 1, 2, 3, 5 ]
  array source completed 

  .pipe(flatMap()).schedule()
  0
  1
  2
  3
  5
  array source completed
 */
