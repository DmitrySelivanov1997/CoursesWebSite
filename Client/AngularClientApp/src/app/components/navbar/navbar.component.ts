import { Component, OnInit, Inject } from '@angular/core';


import { Router } from '@angular/router';
import { DialogLogin } from '../login-component/login-component.component';
import { MatDialog } from "@angular/material";
import { DialogRegister } from '../register-component/register-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  public userSurname: string;
  constructor(private router: Router, public dialog: MatDialog) {
    this.loggedIn = localStorage.getItem("jwt")?true:false;
    this.userSurname = localStorage.getItem("userSurname");
   }

  ngOnInit() {
  }
  onLogin(){
    const dialogRef = this.dialog.open(DialogLogin);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        localStorage.setItem("jwt", result.token );
        localStorage.setItem("userSurname", result.user.surname );
        this.userSurname = result.user.surname
        this.loggedIn = true;
      }
      this.router.navigate(["/"]);
    });
  }
  onRegister(){
    const dialogRef = this.dialog.open(DialogRegister);

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/"]);
    });
  }
  onLogout(){
    localStorage.removeItem("jwt");
    this.loggedIn = false;
  }
}

