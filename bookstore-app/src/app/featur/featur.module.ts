import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturRoutingModule } from './featur-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBookComponent } from './components/single-book/single-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    SingleBookComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    FeaturRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FeaturModule { }