import { take, flatMap } from 'rxjs/operators';
import { noop } from 'rxjs/index';

/* ==== Create Observable ==== */
/*  --- of array --- */
import {arraySource as src04ArraySource} from './04-src-of';
src04ArraySource.subscribe(
  (ns: [number]) => console.log(ns),
  noop,
  _ => console.log('array source completed')
)
src04ArraySource.pipe(
  flatMap((ns: number[]) => ns)
).subscribe(
  (n: [number]) => console.log(n),
  noop,
  _ => console.log('array source completed')
)

/*  --- of sequence --- */
// import {seqSource as src04SeqSource} from './04-src-of';
// src04SeqSource.subscribe(
//   (n: number) => console.log(n),
//   noop,
//   _ => console.log('sequence source completed')
// )

/*  --- from iterator --- */
// import {iteratorSource as src03IteratorSource} from './03-src-from';
// src03IteratorSource.pipe(take(10)).subscribe(
//   (fibo: number) => console.log(fibo)
// );
/*  --- from string --- */
// import {stringSource as src03StringSource} from './03-src-from';
// src03StringSource.subscribe(
//   (chr: string) => console.log(chr)
// );
/*  --- from promise --- */
// import {promiseSource as src03PromiseSource} from './03-src-from';
// src03PromiseSource.subscribe(
//   (s: string) => console.log(s)
// );
/*  --- from array --- */
// import {arraySource as src03ArraySource} from './03-src-from';
// src03ArraySource.subscribe(
//   (n: Number) => console.log(n)
// );

/*  --- ajax --- */
// import {users as src02AjaxGithubUsers } from './02-src-ajax'; 
// src02AjaxGithubUsers.subscribe(
//   r => console.log(r),
//   e => console.error(e)
// );

/* ==== check if setup is working ==== */
// import {source as src01hello } from './01-hello'; 
// src01hello.subscribe(x => console.log(x));
