import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogLogin } from './dialogLogin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent {

  constructor(private router: Router, public dialog: MatDialog) {
    const dialogRef = this.dialog.open(DialogLogin);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        localStorage.setItem("jwt", result.token );
        localStorage.setItem("userName", result.user.name );
        localStorage.setItem("userSurname", result.user.surname );
        localStorage.setItem("userRole", result.user.role );
        localStorage.setItem("userId", result.user.id );
        localStorage.setItem("login", result.user.login );
      }
      this.router.navigate(["/"]);
    }); }

}
