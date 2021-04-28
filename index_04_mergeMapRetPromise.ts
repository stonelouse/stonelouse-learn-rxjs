import { of, pipe } from "rxjs";
import { mergeMap, switchMap, concatMap } from "rxjs/operators";
/*
  Key takeaway: ...Map() can return a Promise!
 */
export function index_04_mergeMapRetPromise() {
  /* mergeMap 
  {
    let m: number = 0;
    of(1, 2, 3)
      .pipe(
        mergeMap(
          (n: number) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                m += 1;
                console.log("a#10#", { n }, { m });
                resolve(n * m);
              }, 200);
            })
        )
      )
      .subscribe((r: number) => console.log("a#99#", { r }));
  }
  // a#10# {n: 1} {m: 1}
  // a#99# {r: 1} 
  // a#10# {n: 2} {m: 2}
  // a#99# {r: 4} 
  // a#10# {n: 3} {m: 3}
  // a#99# {r: 9}
  */
  /* switchMap
  {
    let o: number = 0;
    of(1, 2, 3)
      .pipe(
        switchMap(
          (n: number) =>
            new Promise((resolve, reject) => {
              o += 1;
              console.log("b#10#", { n }, { o });
              setTimeout(() => resolve(n * o));
            })
        )
      )
      .subscribe((r: number) => console.log("b#99#", { r }));
  }
  // b#10# {n: 1} {o: 1}
  // b#10# {n: 2} {o: 2}
  // b#10# {n: 3} {o: 3}
  // b#99# {r: 9}
  */
  /* concatMap - in this case the same result as mergeMap
   */
  {
    let p: number = 0;
    of(1, 2, 3)
      .pipe(
        concatMap(
          (n: number) =>
            new Promise((resolve, reject) => {
              p += 1;
              console.log("c#10#", { n }, { p });
              setTimeout(() => resolve(n * p));
            })
        )
      )
      .subscribe((r: number) => console.log("c#99#", { r }));
  }
  // c#10# {n: 1} {p: 1}
  // c#99# {r: 1}
  // c#10# {n: 2} {p: 2}
  // c#99# {r: 4}
  // c#10# {n: 3} {p: 3}
  // c#99# {r: 9}
}
