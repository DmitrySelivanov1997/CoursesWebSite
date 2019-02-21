import { Component, OnInit, Inject } from '@angular/core';
import { CourseHttpDataProvider } from 'src/app/services/course-http-data-provider/CourseHttpDataProvider';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-delete-course-dialog',
  templateUrl: './delete-course-dialog.component.html',
  styleUrls: ['./delete-course-dialog.component.css']
})
export class DeleteCourseDialogComponent{
    constructor(
      protected dialogRef: MatDialogRef<DeleteCourseDialogComponent>,
      protected dataProvider: CourseHttpDataProvider,
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
  