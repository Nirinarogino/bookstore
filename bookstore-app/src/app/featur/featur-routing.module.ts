import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { AuthGuard } from '../guards/guards';

const routes: Routes = [
  {path:'', component: HomeComponent, canActivate:[AuthGuard]},
  {path:'add',component: AddBookComponent, canActivate:[AuthGuard]},
  {path:'admin', component: AdminPageComponent, canActivate:[AuthGuard]},
  {path:':id',component: SingleBookComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturRoutingModule { }
