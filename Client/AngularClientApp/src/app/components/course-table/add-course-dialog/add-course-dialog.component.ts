import { Component, OnInit, Inject } from '@angular/core';
import { CourseHttpDataProvider } from 'src/app/services/course-http-data-provider/CourseHttpDataProvider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent {
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<AddCourseDialogComponent>,
    protected dataProvider: CourseHttpDataProvider,
    @Inject(MAT_DIALOG_DATA) protected dataObject: any
  ) {
  this.formGroup = new FormGroup({
    professor: new FormControl(""),
    name: new FormControl("", Validators.required),
    detailes: new FormControl("")
  })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onComplete(): void {
    let model = {
      Professor: this.formGroup.controls["professor"].value,
      Name: this.formGroup.controls["name"].value,
      Details: this.formGroup.controls["detailes"].value,
    }
    this.dataProvider
      .addData(model)
      .subscribe((res) => this.dialogRef.close(res["data"]));
  }
}
