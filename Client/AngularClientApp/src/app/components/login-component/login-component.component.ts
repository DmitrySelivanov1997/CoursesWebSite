import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators }   from '@angular/forms';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-login',
  templateUrl: 'app-dialog-login.html',
})
export class DialogLogin {

  formGroup: FormGroup;
  public loginValid: boolean = true;
  constructor(
    public dialogRef: MatDialogRef<DialogLogin>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient, ) {
      this.formGroup = new FormGroup({
        login: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
      })
    }

  onCancel(): void {
    this.dialogRef.close();
  }
  onComplete(): void {{
    let credentials = JSON.stringify(this.formGroup.value);
    this.http.post("http://localhost:5000/api/auth/login", credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      this.loginValid = true;
      this.dialogRef.close(token);
    }, err => {
      this.loginValid = false;
    });
  }
  }

}