import { Component, OnInit, ViewChild } from '@angular/core';
import { UserDataSource } from 'src/app/services/UserDataSource';
import { MatPaginator, MatDialog } from '@angular/material';
import { UserHttpDataProvider } from 'src/app/services/user-http-data-provider/UserHttpDataProvider';
import { BehaviorSubject, of } from 'rxjs';
import { CommentHttpDataProvider } from 'src/app/services/comment-http-data-provider/CommentHttpDataProvider';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { GlobalApp } from 'src/app/utils/globalStoarge';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public editorContent: string = "";
  courseId: string;
  protected loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  dataSource: any[] = [];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  anonymous: boolean = false;
  constructor(private commentProvider: CommentHttpDataProvider, private route: ActivatedRoute, public app: GlobalApp) {
    this.route.params.subscribe(params => {
      this.courseId = params['id'];
    });
  }
  ngOnInit() {
    this.loadData(0, 5);
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.loadData(this.paginator.pageIndex, this.paginator.pageSize)
    });
  }
  changeValue(value) {
    this.anonymous = !value;
}
  onComment(){
    let comment = {
      value: this.editorContent,
      courseId: this.courseId,
      userId: this.app.localStorageItem("userId"),
      anonymous: this.anonymous
    }
    this.commentProvider.addData(comment).subscribe(x=>this.loadData(this.paginator.pageIndex, this.paginator.pageSize))
  }
  private loadData(pageIndex, pageSize) {
    this.loadingSubject.next(true)
    this.commentProvider.getCount(this.courseId).subscribe(res => this.paginator.length = res)
    this.commentProvider.getPaged(this.courseId, pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(res => {
      this.dataSource = res;
    });

  }
}
