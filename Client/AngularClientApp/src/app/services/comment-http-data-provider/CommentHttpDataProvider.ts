import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { users, server, global, courses, comments } from '../../endPoints';
import { GlobalApp } from 'src/app/utils/globalStoarge';

@Injectable({
    providedIn: "root"
})
export class CommentHttpDataProvider {
    constructor(private http: HttpClient, private app: GlobalApp) {
    }
    getPaged(id: string, page?: number, perPage?: number): Observable<any[]> {
        return this.http
            .get(`${server.url}${server.api}${comments.comments}${courses.courses}/${id}${global.getByPage}`, {
                params: new HttpParams()
                    .set("page", page.toString())
                    .set("perPage", perPage.toString())
            })
            .pipe(map(res => res["data"]));
    }
    getCount(id: string): Observable<number> {
        return this.http
            .get(`${server.url}${server.api}${comments.comments}${courses.courses}/${id}${global.getCount}`, {
                params: new HttpParams()
            })
            .pipe(map(res => res["data"]));
    }
    addData(comment: any): Observable<any> {
        const token = this.app.localStorageItem("jwt");
        let headers = new HttpHeaders({
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        })
        return this.http
            .post(
                `${server.url}${server.api}${comments.comments}`,
                {
                    Value: comment.value,
                    UserId: comment.userId,
                    CourseId: comment.courseId,
                    Anonymous: comment.anonymous
                },
                { headers }
            )
            .pipe(map(res => res));
    }
    deleteData(commentToDeleteId: string): Observable<any> {
        const token = this.app.localStorageItem("jwt");
        let headers = new HttpHeaders({
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        })
        return this.http
            .request("delete", `${server.url}${server.api}${comments.comments}/${commentToDeleteId}`, { headers })
            .pipe(map(res => res));
    }
}
