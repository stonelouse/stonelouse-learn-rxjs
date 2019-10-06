/* ==== Create Observable ==== */

/*  --- ajax --- */
import {users as src02githubusers } from './02-src-ajax'; 
src02githubusers.subscribe(
  r => console.log(r),
  e => console.error(e)
)

// ---- check if everything is working ---
// import {source as src01hello } from './01-hello'; 
// src01hello.subscribe(x => console.log(x));
