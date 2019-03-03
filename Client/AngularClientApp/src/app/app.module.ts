import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import {
  MatDialogModule,
  MatDatepickerModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatCardModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatListModule ,
  MatToolbarModule,
  MatSelectionList 
} from "@angular/material";
import { NgxEditorModule } from 'ngx-editor';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { DialogLogin } from './components/login-component/dialogLogin.component';
import { HomeComponent } from './components/home-component/home-component.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { DialogRegister } from './components/register-component/register-dialog.component';
import { LoginComponent } from './components/login-component/login-component.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { DeleteUserDialogComponent } from './components/user-table/delete-user-dialog/delete-user-dialog.component';
import { UsersTableComponent } from './components/user-table/user-table.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { DeleteCourseDialogComponent } from './components/course-table/delete-course-dialog/delete-course-dialog.component';
import { AddCourseDialogComponent } from './components/course-table/add-course-dialog/add-course-dialog.component';
import { UpdateCourseDialogComponent } from './components/course-table/update-course-dialog/update-course-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SafeHtmlPipe } from './pipes/SafeHtmlPipe';
import { ForbiddenRedirectComponent } from './components/forbidden-redirect/forbidden-redirect.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DialogLogin,
    DialogRegister,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UsersTableComponent,
    DeleteUserDialogComponent,
    CourseTableComponent,
    DeleteCourseDialogComponent,
    AddCourseDialogComponent,
    UpdateCourseDialogComponent,
    CommentsComponent,
    SafeHtmlPipe,
    ForbiddenRedirectComponent,
  ],
  imports: [
    NgxEditorModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatListModule
  ],
  providers: [MatSelectionList],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogLogin,
    DialogRegister,
    DeleteUserDialogComponent,
    UpdateCourseDialogComponent,
    AddCourseDialogComponent,
    DeleteCourseDialogComponent,
  ]
})
export class AppModule { }
