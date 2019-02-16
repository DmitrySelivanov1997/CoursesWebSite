import { HomeComponent } from "./src/app/components/home-component/home-component.component";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
