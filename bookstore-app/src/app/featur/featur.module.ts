import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturRoutingModule } from './featur-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FeaturRoutingModule
  ]
})
export class FeaturModule { }
