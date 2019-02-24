import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { users, server, global } from '../../endPoints';
import { GlobalApp } from 'src/app/utils/globalStoarge';

@Injectable({
  providedIn: "root"
})
export class UserHttpDataProvider {
  constructor(private http: HttpClient, private app: GlobalApp) {
  }
  getByLogin(login: string): Observable<any[]> {
    const token = this.app.localStorageItem("jwt");
    return this.http
      .get(`${server.url}${server.api}${users.users}${users.getByLogin}`, {
        params: new HttpParams().set("login", login)
        , headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      })
      .pipe(map(res => res["data"]));
  }
  getPaged(page?: number, perPage?: number): Observable<any[]> {
    const token = this.app.localStorageItem("jwt");
    return this.http
      .get(`${server.url}${server.api}${users.users}${global.getByPage}`, {
        params: new HttpParams()
          .set("page", page.toString())
          .set("perPage", perPage.toString()),
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      })
      .pipe(map(res => res['data']));
  }
  getCount(): Observable<number> {
    const token = this.app.localStorageItem("jwt");
    return this.http
      .get(`${server.url}${server.api}${users.users}${global.getCount}`, {
        params: new HttpParams(),
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      })
      .pipe(map(res => res["data"]));
  }
  addData(user: any): Observable<any> {
    const token = this.app.localStorageItem("jwt");
    let headers = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    })
    return this.http
      .post(
        `${server.url}${server.api}${users.users}`,
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
  deleteData(usersToDelete: any[]): Observable<any> {
    const token = this.app.localStorageItem("jwt");
    return this.http
      .request("delete", `${server.url}${server.api}${users.users}`, {
        body: usersToDelete.map(user => user.id),
        headers: new HttpHeaders({
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        })
      })
      .pipe(map(res => res));
  }
}
