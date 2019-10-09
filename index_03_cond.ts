import { take } from "rxjs/operators";
import { multipleOfFour as src06MultipleOfFour } from "./06-cond-iif";
import { onlyTheFourth as src06onlyTheFourth } from "./06-cond-iif";

/* ==== Conditional ==== */
/*  --- iif --- */
export function demonstrateConditionalOps() {
  src06MultipleOfFour
    .pipe(take(13))
    .subscribe((n: number) => console.log("06a", n, "06A"));
  src06onlyTheFourth
    .pipe(take(13))
    .subscribe((n: number) => console.log("06b", n, "06B"));
}
