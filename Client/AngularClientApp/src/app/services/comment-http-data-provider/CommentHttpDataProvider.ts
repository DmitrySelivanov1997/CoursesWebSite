import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import { users, server, global, courses, comments } from '../../endPoints';

@Injectable({
    providedIn: "root"
})
export class CommentHttpDataProvider {
    constructor(private http: HttpClient) {
    }
    getPaged(id:string, page?: number, perPage?: number): Observable<any[]> {
        return this.http
            .get(`${server.url}${server.api}${comments.comments}${courses.courses}/${id}${global.getByPage}`, {
                params: new HttpParams()
                    .set("page", page.toString())
                    .set("perPage", perPage.toString())
            })
            .pipe(map(res => res["data"]));
    }
    getCount(id:string): Observable<number> {
        return this.http
            .get(`${server.url}${server.api}${comments.comments}${courses.courses}/${id}${global.getCount}`, {
                params: new HttpParams()
            })
            .pipe(map(res => res["data"]));
    }
    addData(comment: any): Observable<any> {
        let headers = new HttpHeaders().set("Content-Type", "application/json");
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
    deleteData(commentToDelete: string): Observable<any> {
        return this.http
            .request("delete", `${server.url}${server.api}${comments.comments}/${commentToDelete}`)
            .pipe(map(res => res));
    }
}
