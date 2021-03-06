import { HomeComponent } from "./components/home-component/home-component.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from './components/login-component/login-component.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth-guard.service';
import { UsersTableComponent } from './components/user-table/user-table.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ForbiddenRedirectComponent } from './components/forbidden-redirect/forbidden-redirect.component';
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: []
  },
  {
    path: "login",
    component: LoginComponent,
    children: []
  },
  {
    path: "logout",
    component: LogoutComponent,
    children: []
  },
  {
    path: "register",
    component: RegisterComponent,
    children: []
  },
  {
    path: "users",
    component: UsersTableComponent,
    canActivate: [AuthGuard],
    children: []
  },
  {
    path: "courses",
    component: CourseTableComponent,
    children: []
  },
  {
    path: "comments/:id",
    component: CommentsComponent,
    children: []
  },
  {
    path: "forbidden",
    component: ForbiddenRedirectComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
