import { Injectable } from '@angular/core';

import { CanActivate } from '@angular/router/src/utils/preactivation';

import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: "root"
  })
export class AuthGuard implements CanActivate {
    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
  constructor( private router: Router) {
  }
  canActivate() {
    var token = localStorage.getItem("jwt");
    const helper = new JwtHelperService();
    if (token && !helper.isTokenExpired(token)){
      return true;
    }
    localStorage.removeItem("jwt");
    this.router.navigate(["login"]);
    return false;
  }
}