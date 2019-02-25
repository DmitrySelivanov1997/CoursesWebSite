import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CourseDataSource } from 'src/app/services/CourseDataSource';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatDialog } from '@angular/material';
import { UserHttpDataProvider } from 'src/app/services/user-http-data-provider/UserHttpDataProvider';
import { UserDataSource } from 'src/app/services/UserDataSource';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DeleteUserDialogComponent } from '../user-table/delete-user-dialog/delete-user-dialog.component';
import { CourseHttpDataProvider } from 'src/app/services/course-http-data-provider/CourseHttpDataProvider';
import { DeleteCourseDialogComponent } from './delete-course-dialog/delete-course-dialog.component';
import { UpdateCourseDialogComponent } from './update-course-dialog/update-course-dialog.component';
import { AddCourseDialogComponent } from './add-course-dialog/add-course-dialog.component';
import { GlobalApp } from 'src/app/utils/globalStoarge';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "professor",
    "name",
    "details",
    "comments",
    "actionsColumn"
  ];
  selection = new SelectionModel<any>(true, []);
  dataSource: CourseDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild("filterName")
  filterName: ElementRef;

  constructor(private courseProvider: CourseHttpDataProvider, private dialog: MatDialog, public app: GlobalApp) {}
  ngOnInit() {
    this.dataSource = new CourseDataSource(this.courseProvider, this.paginator);
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  ngAfterViewInit() {
    this.dataSource.loadCourses();

    fromEvent(this.filterName.nativeElement, "keyup")
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterName.nativeElement.value !== "") {
          this.dataSource.loadCoursesByName(
            this.filterName.nativeElement.value
          );
        } else this.dataSource.loadCourses();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadCourses());
  }
  deleteCourse() {
    const dialogRef = this.dialog.open(DeleteCourseDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.dataSource.loadCourses();
        this.selection.clear();
      }
    });
  }
  editCourse(course: any) {
    const dialogRef = this.dialog.open(UpdateCourseDialogComponent, {
      data: course
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result>=0) {
        this.dataSource.loadCourses();
        this.selection.clear();
      }
    });
  }
  addCourse() {
    const dialogRef = this.dialog.open(AddCourseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.loadCourses();
        this.selection.clear();
      }
    });
  }

}
