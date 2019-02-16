import { Component, OnInit, Inject } from '@angular/core';


import { Router } from '@angular/router';
import { DialogLogin } from '../login-component/login-component.component';
import { MatDialog } from "@angular/material";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }
  onLogin(){
    const dialogRef = this.dialog.open(DialogLogin);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        localStorage.setItem("jwt", result );
      }
      this.router.navigate(["/"]);
    });
  }
}

