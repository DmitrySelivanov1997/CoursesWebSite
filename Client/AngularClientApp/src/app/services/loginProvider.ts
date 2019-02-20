import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { server, users, auth } from '../endPoints';

@Injectable({
    providedIn: "root"
})
export class LoginProvider {
    constructor(private http: HttpClient) {
    }
    login(login: string, password: string): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http
            .post(`${server.url}${server.api}${auth.auth}${auth.login}`, {
                login: login,
                password: password
            }, {
                    headers
                })
    }
}
