import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleBookComponent } from './components/single-book/single-book.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'id',component: SingleBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturRoutingModule { }
