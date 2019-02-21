import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseHttpDataProvider } from 'src/app/services/course-http-data-provider/CourseHttpDataProvider';

@Component({
  selector: 'app-update-course-dialog',
  templateUrl: './update-course-dialog.component.html',
  styleUrls: ['./update-course-dialog.component.css']
})
export class UpdateCourseDialogComponent {
  formGroup: FormGroup;
  constructor(
    protected dialogRef: MatDialogRef<UpdateCourseDialogComponent>,
    protected dataProvider: CourseHttpDataProvider,
    @Inject(MAT_DIALOG_DATA) protected dataObject: any
  ) {
  this.formGroup = new FormGroup({
    professor: new FormControl(dataObject.professor),
    name: new FormControl(dataObject.name, Validators.required),
    detailes: new FormControl(dataObject.details),
    id: new FormControl(dataObject.id)
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
      Id: this.formGroup.controls["id"].value,
    }
    this.dataProvider
      .editData(model)
      .subscribe((res) => this.dialogRef.close(res["data"]));
  }
}
