import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:':id',component: SingleBookComponent},
  {path:'add',component: AddBookComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturRoutingModule { }
