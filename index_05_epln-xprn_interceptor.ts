import { from, Observable, of, throwError } from "rxjs";
import {
  catchError,
  concatMap,
  delay,
  filter,
  first,
  map,
  mergeMap,
  takeUntil,
  takeWhile
} from "rxjs/operators";

class TArg {
  id: string;
  target: string;
  value: string;
}

interface Handler {
  handle(arg: TArg): Observable<boolean>;
}
class ObservableHandler implements Handler {
  public static readonly ID = "#oh";

  handle(arg: TArg): Observable<boolean> {
    if (arg.target !== ObservableHandler.ID) {
      console.log(`${arg.id}.00`, ObservableHandler.ID, "not responsible");
      return of(false);
    }
    return new Observable<boolean>(subscriber => {
      if (arg.value === "error") {
        console.log(ObservableHandler.ID, `${arg.id}.01`, "error/complete");
        /* if we throw e, the observable chain is broken */
        // subscriber.error(new Error(arg.value));
        subscriber.next(true);
        subscriber.complete();
      } else {
        console.log(ObservableHandler.ID, `${arg.id}.02`, "next/complete");
        subscriber.next(true);
        subscriber.complete();
      }
    }).pipe(delay(200));
  }
}

class PromiseHandler implements Handler {
  public static readonly ID = "#ph";

  handle(arg: TArg): Observable<boolean> {
    if (arg.target !== PromiseHandler.ID) {
      console.log(`${arg.id}.00`, PromiseHandler.ID, "not responsible");
      return of(false);
    }
    return from(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (arg.value === "error") {
            console.log(PromiseHandler.ID, `${arg.id}.01`, "reject");
            reject(new Error(arg.value));
          } else {
            console.log(PromiseHandler.ID, `${arg.id}.02`, "resolve");
            resolve(arg.value);
          }
        }, 200);
      })
        .then(result => {
          console.log(PromiseHandler.ID, `${arg.id}.03`, "resolved", {
            result
          });
          return true;
        })
        .catch(error => {
          console.log(PromiseHandler.ID, `${arg.id}.04`, "rejected", { error });
          /* if we throw e, the observable chain is broken */
          // throw e;
          return true;
        })
    );
  }
}

const event$: Observable<TArg> = from([
  { id: "1", target: PromiseHandler.ID, value: "success" },
  { id: "2", target: PromiseHandler.ID, value: "error" },
  { id: "3", target: ObservableHandler.ID, value: "success" },
  { id: "4", target: ObservableHandler.ID, value: "error" },
  { id: "5", target: ObservableHandler.ID, value: "success" }
]);
const handler$: Observable<Handler> = from([
  new PromiseHandler(),
  new ObservableHandler()
]);

export function main() {
  event$
    .pipe(
      concatMap((arg: TArg) => {
        return handler$.pipe(
          concatMap((handler: Handler) => {
            return handler.handle(arg);
          }),
          first((isResponsible: boolean) => isResponsible)
        );
      }),
      map((result: boolean) => {
        console.log("#50", { result });
        return result;
      }),
      catchError((e: unknown) => {
        console.error("#59", { e });
        return throwError(e);
      })
    )
    .subscribe(
      result => console.log("#60", { result }),
      error => console.error("#65", { error }),
      () => console.log("completed")
    );
}
