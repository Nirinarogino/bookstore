import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'add',component: AddBookComponent},
  {path:':id',component: SingleBookComponent},
  {path:'admin', component: AdminPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturRoutingModule { }
