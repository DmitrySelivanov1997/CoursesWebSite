import { Component, OnInit, Inject } from '@angular/core';


import { Router } from '@angular/router';
import { DialogLogin } from '../login-component/dialogLogin.component';
import { MatDialog } from "@angular/material";
import { DialogRegister } from '../register-component/register-dialog.component';
import { GlobalApp } from 'src/app/utils/globalStoarge';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public app: GlobalApp) {
   }

  ngOnInit() {
  }
}

