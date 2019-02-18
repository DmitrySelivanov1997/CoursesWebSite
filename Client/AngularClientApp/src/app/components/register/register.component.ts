import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogRegister } from '../register-component/register-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private router: Router, public dialog: MatDialog) { 
    const dialogRef = this.dialog.open(DialogRegister);
  
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(["/"]);
    });}


}