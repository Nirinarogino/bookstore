import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturRoutingModule } from './featur-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBookComponent } from './components/single-book/single-book.component';


@NgModule({
  declarations: [
    HomeComponent,
    SingleBookComponent
  ],
  imports: [
    CommonModule,
    FeaturRoutingModule,
    SharedModule
  ]
})
export class FeaturModule { }