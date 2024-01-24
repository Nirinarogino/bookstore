import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./auth/auth.module")
      .then(module => module.AuthModule),
    title: "Bookstore | Authentication"
  },
  {
    path: "home",
    loadChildren: () => import("./featur/featur.module")
      .then(module => module.FeaturModule),
    title: "home | bookstore"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
