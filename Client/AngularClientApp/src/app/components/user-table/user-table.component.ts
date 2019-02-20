import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator, MatDialog } from "@angular/material";
import { SelectionModel } from "@angular/cdk/collections";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { UserHttpDataProvider } from 'src/app/services/user-http-data-provider/UserHttpDataProvider';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';
import { UserDataSource } from 'src/app/services/UserDataSource';

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.css"]
})
export class UsersTableComponent implements OnInit {
  columnsToDisplay: string[] = [
    "select",
    "login",
    "name",
    "surname",
    "actionsColumn"
  ];
  selection = new SelectionModel<any>(true, []);
  dataSource: UserDataSource;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild("filterLogin")
  filterLogin: ElementRef;

  constructor(private userProvider: UserHttpDataProvider, private dialog: MatDialog) {}
  ngOnInit() {
    this.dataSource = new UserDataSource(this.userProvider, this.paginator);
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
    this.dataSource.loadUsers();

    fromEvent(this.filterLogin.nativeElement, "keyup")
      .pipe(
        debounceTime(350),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
        })
      )
      .subscribe(() => {
        if (this.filterLogin.nativeElement.value !== "") {
          this.dataSource.loadUsersByLogin(
            this.filterLogin.nativeElement.value
          );
        } else this.dataSource.loadUsers();
      });

    this.paginator.page.subscribe(() => this.dataSource.loadUsers());
  }
  deleteUser() {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: this.selection.selected
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.dataSource.loadUsers();
        this.selection.clear();
      }
    });
  }

}
