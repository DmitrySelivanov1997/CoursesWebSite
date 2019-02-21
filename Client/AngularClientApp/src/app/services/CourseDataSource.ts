import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import { AbstractDataSource } from './abstractDataSource';
import { UserHttpDataProvider } from './user-http-data-provider/UserHttpDataProvider';
import { CourseHttpDataProvider } from './course-http-data-provider/CourseHttpDataProvider';

export class CourseDataSource extends AbstractDataSource {
  constructor(
    private courseService: CourseHttpDataProvider,
    public paginator: MatPaginator
  ) {
    super();
  }

  loadCourses() {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.courseService.getCount().subscribe(res => this.dataCount.next(res));
    this.courseService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => this.dataSubject.next(users));
  }

  loadCoursesByName(name: string) {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.courseService
      .getByName(name)
      .pipe<any[], any[]>(
        catchError<any[], any[]>(() => of<any[]>()),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(data => {
        if (data) {
          this.dataCount.next(data.length);
          this.dataSubject.next(data);
        } else {
          this.dataCount.next(0);
          this.dataSubject.next([]);
        }
      });
  }
}
