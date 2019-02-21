import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { users, server, global, courses } from '../../endPoints';

@Injectable({
    providedIn: "root"
})
export class CourseHttpDataProvider {
    constructor(private http: HttpClient) {
    }
    getByName(name: string): Observable<any[]> {
        return this.http
            .get(`${server.url}${server.api}${courses.courses}${global.getByName}`, {
                params: new HttpParams().set("name", name)
            })
            .pipe(map(res => res["data"]));
    }
    getPaged(page?: number, perPage?: number): Observable<any[]> {
        return this.http
            .get(`${server.url}${server.api}${courses.courses}${global.getByPage}`, {
                params: new HttpParams()
                    .set("page", page.toString())
                    .set("perPage", perPage.toString())
            })
            .pipe(map(res => res["data"]));
    }
    getCount(): Observable<number> {
        return this.http
            .get(`${server.url}${server.api}${courses.courses}${global.getCount}`, {
                params: new HttpParams()
            })
            .pipe(map(res => res["data"]));
    }
    addData(course: any): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http
            .post(
                `${server.url}${server.api}${courses.courses}`,
                {
                    Professor: course.Professor,
                    Name: course.Name,
                    Details: course.Details,
                },
                { headers }
            )
            .pipe(map(res => res));
    }
    deleteData(coursesToDelete: any[]): Observable<any> {
        return this.http
            .request("delete", `${server.url}${server.api}${courses.courses}`, {
                body: coursesToDelete.map(user => user.id)
            })
            .pipe(map(res => res));
    }
    editData(course: any): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http
            .put(
                `${server.url}${server.api}${courses.courses}`,
                {
                    Professor: course.Professor,
                    Name: course.Name,
                    Details: course.Details,
                    Id: course.Id,
                },
                { headers }
            )
            .pipe(map(res => res));
    }
}
