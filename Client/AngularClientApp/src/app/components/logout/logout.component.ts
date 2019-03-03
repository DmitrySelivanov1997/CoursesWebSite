import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("userName");
    localStorage.removeItem("userSurname");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("login");
    this.router.navigate(["/"]);
  }

}
