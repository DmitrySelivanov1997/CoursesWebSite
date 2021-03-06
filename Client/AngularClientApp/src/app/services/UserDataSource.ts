import { of } from "rxjs";
import { finalize, catchError } from "rxjs/operators";
import { MatPaginator } from "@angular/material";
import { AbstractDataSource } from './abstractDataSource';
import { UserHttpDataProvider } from './user-http-data-provider/UserHttpDataProvider';

export class UserDataSource extends AbstractDataSource {
  constructor(
    private userService: UserHttpDataProvider,
    public paginator: MatPaginator
  ) {
    super();
  }

  loadUsers() {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.userService.getCount().subscribe(res => this.dataCount.next(res));
    this.userService
      .getPaged(this.paginator.pageIndex, this.paginator.pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(users => this.dataSubject.next(users));
  }

  loadUsersByLogin(login: string) {
    setTimeout(() => this.loadingSubject.next(true), 0);
    this.userService
      .getByLogin(login)
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
