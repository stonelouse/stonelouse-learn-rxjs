import { take, flatMap } from "rxjs/operators";
import { noop } from "rxjs/index";
import { arraySource as src04ArraySource } from "./04-src-of";
import { seqSource as src04SeqSource } from "./04-src-of";
import { iteratorSource as src03IteratorSource } from "./03-src-from";
import { stringSource as src03StringSource } from "./03-src-from";
import { promiseSource as src03PromiseSource } from "./03-src-from";
import { arraySource as src03ArraySource } from "./03-src-from";
import { users as src02AjaxGithubUsers } from "./02-src-ajax";
import { source as src01hello } from "./01-hello";

export function demonstrateObservableCreation() {
  /* ==== Create Observable ==== */
  /*  --- of array --- */
  src04ArraySource.subscribe((ns: [number]) => console.log(ns), noop, () =>
    console.log("array source completed")
  );
  src04ArraySource
    .pipe(flatMap((ns: number[]) => ns))
    .subscribe((n: number) => console.log(n), noop, () =>
      console.log("array source completed")
    );
  /*  --- of sequence --- */
  src04SeqSource.subscribe((n: number) => console.log(n), noop, () =>
    console.log("sequence source completed")
  );

  /*  --- from iterator --- */
  src03IteratorSource
    .pipe(take(10))
    .subscribe((fibo: number) => console.log(fibo));
  /*  --- from string --- */
  src03StringSource.subscribe((chr: string) => console.log(chr));
  /*  --- from promise --- */
  src03PromiseSource.subscribe((s: string) => console.log(s));
  /*  --- from array --- */
  src03ArraySource.subscribe((n: Number) => console.log(n));

  /*  --- ajax --- */
  src02AjaxGithubUsers.subscribe(r => console.log(r), e => console.error(e));

  /* ==== check if setup is working ==== */
  src01hello.subscribe(x => console.log(x));
}
