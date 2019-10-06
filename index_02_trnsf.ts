import { concatMap1Src as src05ConcatMap1Src } from "./05-trnsf-concatMap";
import { mergeMap1Src as src05MergeMap1Src } from "./05-trnsf-concatMap";

/* ==== Transformation ==== */
/*  --- concatMap --- */
export function demonstrateTransformationOps() {
  src05ConcatMap1Src.subscribe((n: number) => console.log("05a", n, "05A"));
  src05MergeMap1Src.subscribe((n: number) => console.log("05b", n, "05B"));
}
