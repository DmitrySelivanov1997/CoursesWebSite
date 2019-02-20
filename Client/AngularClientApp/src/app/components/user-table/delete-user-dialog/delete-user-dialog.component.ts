import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserHttpDataProvider } from 'src/app/services/user-http-data-provider/UserHttpDataProvider';
import { FormGroup } from '@angular/forms';

@Component({
  selector: "app-delete-user-dialog",
  templateUrl: "./delete-user-dialog.component.html",
  styleUrls: ["./delete-user-dialog.component.css"]
})
export class DeleteUserDialogComponent{
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    protected dataProvider: UserHttpDataProvider,
    @Inject(MAT_DIALOG_DATA) protected data: any[]
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dataProvider
      .deleteData(this.data)
      .subscribe((res) => this.dialogRef.close(res["data"]));
  }
}
