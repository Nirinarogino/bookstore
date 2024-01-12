import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module")
      .then(module => module.AuthModule),
    title: "Bookstore | Authentication"
  },
  {path:'teste', component: SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
