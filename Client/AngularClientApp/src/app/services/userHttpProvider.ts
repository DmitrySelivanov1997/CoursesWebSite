import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { site, users } from '../endPoints';

@Injectable({
  providedIn: "root"
})
export class UserHttpDataProvider {
  constructor(private http: HttpClient) {
  }
  public createUser(user: any): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this.http
      .post(
        `${site.url}${site.api}${users.users}`,
        {
          Login: user.login,
          Password: user.password,
          Name: user.name,
          Surname: user.surname,
          Role: "user"
        },
        { headers }
      )
      .pipe(map(res => res));
  }
}
