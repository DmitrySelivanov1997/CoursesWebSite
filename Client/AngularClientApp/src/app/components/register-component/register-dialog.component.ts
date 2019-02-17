import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { site, users } from '../../endPoints'
import { Observable, from, pipe } from "rxjs";
import { map } from "rxjs/operators";
import { UserHttpDataProvider } from 'src/app/services/userHttpProvider';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css']
})
export class DialogRegister {

  formGroup: FormGroup;
  public registerValid: boolean = true;
  public errorText: string;

  constructor(
    public dialogRef: MatDialogRef<DialogRegister>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userProvider: UserHttpDataProvider, ) {
    this.formGroup = new FormGroup({
      login: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      name: new FormControl(""),
      surname: new FormControl("", Validators.required)
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  onComplete(): void {
    {
      this.userProvider.createUser(this.formGroup.value)
        .subscribe(response => {
          if (response.status === "success") {
            this.registerValid = true;
            this.dialogRef.close();
          }
          else {
            this.registerValid = false;
            this.errorText = response.reason;
          }
        }, err => {
          this.registerValid = false;
          this.errorText = err;
        });
    }
  }

}
