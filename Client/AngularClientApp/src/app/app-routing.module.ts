import { HomeComponent } from "./components/home-component/home-component.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from './components/login-component/login-component.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth-guard.service';
import { UsersTableComponent } from './components/user-table/user-table.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent ,
    canActivate: [AuthGuard] ,
    children: []
  },
  {
    path: "login",
    component: LoginComponent ,
    children: []
  },
  {
    path: "logout",
    component: LogoutComponent ,
    children: []
  },
  {
    path: "register",
    component: RegisterComponent ,
    children: []
  },
  {
    path: "users",
    component: UsersTableComponent ,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
