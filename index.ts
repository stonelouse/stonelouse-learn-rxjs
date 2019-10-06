import {take} from 'rxjs/operators';

/* ==== Create Observable ==== */

/*  --- from string --- */
import {iteratorSource as src03IteratorSource} from './03-src-from';
src03IteratorSource.pipe(take(10)).subscribe(
  (fibo: number) => console.log(fibo)
);
/*  --- from string --- */
import {stringSource as src03StringSource} from './03-src-from';
src03StringSource.subscribe(
  (chr: string) => console.log(chr)
);
/*  --- from promise --- */
import {promiseSource as src03PromiseSource} from './03-src-from';
src03PromiseSource.subscribe(
  (s: string) => console.log(s)
);
/*  --- from array --- */
import {arraySource as src03ArraySource} from './03-src-from';
src03ArraySource.subscribe(
  (n: Number) => console.log(n)
);

/*  --- ajax --- */
// import {users as src02AjaxGithubUsers } from './02-src-ajax'; 
// src02AjaxGithubUsers.subscribe(
//   r => console.log(r),
//   e => console.error(e)
// );

/* ==== check if setup is working ==== */
// import {source as src01hello } from './01-hello'; 
// src01hello.subscribe(x => console.log(x));
