import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturRoutingModule } from './featur-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FeaturRoutingModule,
    SharedModule
  ]
})
export class FeaturModule { }