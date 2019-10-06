import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

const githubUsersUrl = `https://api.github.com/users?per_page=2`;
/*
  const ajax: any;

  It creates an observable for an Ajax request with 
  ... either a request object with url, headers, etc 
  ... or a string for a URL.
 */
export const users: Observable<string> = ajax(githubUsersUrl)
  .pipe(
    map((ajaxResponse: AjaxResponse) => ajaxResponse.response),
    mergeMap((userResponse: Array<{login: string}>) => userResponse
      .map((user: {login: string}) => user.login )
    )
  );
/*
  users.subscribe(x => console.log(x));
  =>
  mojombo
  defunkt
 */
